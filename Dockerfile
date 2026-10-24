# Build from public-mirror git context (no external zip).
# Font fetched from upstream (sha256 matches daneshara zip).
# Favicon restored from favicon.ico.b64 committed beside this file.
FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends curl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY . /app/

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
