# Deploy-only image for Coolify. Does not modify application source
# except overlaying next.config.ts for the trailing-slash redirect fix.
# Fetches the canonical daneshara.zip and runs next build/start.
FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends curl ca-certificates unzip \
  && rm -rf /var/lib/apt/lists/*

ARG DANESHARA_ZIP_URL=https://tmpfiles.org/dl/1792774997.a12e611743012a8d/w2AkUoo4YnkC/daneshara.zip
RUN curl -fsSL -o /tmp/daneshara.zip "$DANESHARA_ZIP_URL" \
  && unzip -q /tmp/daneshara.zip -d /tmp \
  && cp -a /tmp/daneshara/. /app/ \
  && rm -rf /tmp/daneshara.zip /tmp/daneshara

# Overlay: skipTrailingSlashRedirect + dashboard cache-bust headers
COPY next.config.ts /app/next.config.ts

RUN npm ci && npm run build

ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=3000

EXPOSE 3000

CMD ["npx", "next", "start", "--hostname", "0.0.0.0", "--port", "3000"]
