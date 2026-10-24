# Deploy-only image for Coolify. .dockerignore keeps context = Dockerfile only.
# Fetches patched daneshara zip (skipTrailingSlashRedirect + dashboard cache headers).
FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends curl ca-certificates unzip \
  && rm -rf /var/lib/apt/lists/*

ARG DANESHARA_ZIP_URL=https://litter.catbox.moe/z2yser.zip
RUN curl -fsSL -o /tmp/daneshara.zip "$DANESHARA_ZIP_URL" \
  && unzip -q /tmp/daneshara.zip -d /tmp \
  && cp -a /tmp/daneshara/. /app/ \
  && rm -rf /tmp/daneshara.zip /tmp/daneshara

RUN npm ci && npm run build

ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=3000

EXPOSE 3000

CMD ["npx", "next", "start", "--hostname", "0.0.0.0", "--port", "3000"]
