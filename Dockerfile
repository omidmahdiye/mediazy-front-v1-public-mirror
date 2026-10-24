# Deploy-only image. Context is Dockerfile + zipparts/* (see .dockerignore).
# Patched daneshara zip is base64-split under zipparts/ (trailing-slash fix included).
FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates unzip \
  && rm -rf /var/lib/apt/lists/*

COPY zipparts /tmp/zipparts
RUN cat /tmp/zipparts/part-* | base64 -d > /tmp/daneshara.zip \
  && unzip -q /tmp/daneshara.zip -d /tmp \
  && cp -a /tmp/daneshara/. /app/ \
  && rm -rf /tmp/daneshara.zip /tmp/daneshara /tmp/zipparts

RUN npm ci && npm run build

ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=3000

EXPOSE 3000

CMD ["npx", "next", "start", "--hostname", "0.0.0.0", "--port", "3000"]
