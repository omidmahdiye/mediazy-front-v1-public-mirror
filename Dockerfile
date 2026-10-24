# Build from public-mirror git context (no external zip).
# Large text files fetched from short-lived litterbox mirrors (72h), then
# font/favicon binary restore for Coolify context build.
FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends curl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY . /app/

# Overlay full source blobs (mirror repo may hold MCP-sized stubs/parts)
RUN set -e \
  && mkdir -p /app/src/lib \
    "/app/src/app/player/[slug]" \
    "/app/src/app/(site)/courses/[slug]" \
  && curl -fsSL -o /app/favicon.ico.b64 "https://litter.catbox.moe/6fjjf6.b64" \
  && curl -fsSL -o /app/src/lib/data.ts "https://litter.catbox.moe/6dipq7.ts" \
  && curl -fsSL -o "/app/src/app/player/[slug]/player-view.tsx" "https://litter.catbox.moe/mz7koh.tsx" \
  && curl -fsSL -o "/app/src/app/(site)/courses/[slug]/page.tsx" "https://litter.catbox.moe/0rs8wo.tsx" \
  && curl -fsSL -o /app/package-lock.json "https://litter.catbox.moe/yfhbfv.json" \
  && rm -rf /app/_parts

RUN mkdir -p /app/src/fonts /app/src/app \
  && curl -fsSL -o /app/src/fonts/Vazirmatn-Variable.woff2 \
    "https://raw.githubusercontent.com/rastikerdar/vazirmatn/v33.003/fonts/webfonts/Vazirmatn%5Bwght%5D.woff2" \
  && base64 -d /app/favicon.ico.b64 > /app/src/app/favicon.ico \
  && rm -f /app/favicon.ico.b64 /app/README.md \
  && rm -rf /app/_binprobe.dat /app/_binprobe2.dat

RUN npm ci && npm run build

ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=3000

EXPOSE 3000

CMD ["npx", "next", "start", "--hostname", "0.0.0.0", "--port", "3000"]
