# Deploy-only image for Coolify. .dockerignore keeps context = Dockerfile only.
# Fetches patched daneshara zip (SMS OTP auth; empty phone field on login/register).
# Same pattern as successful front-v2 — curl tmpfiles /dl/ zip (not zipparts, not litterbox).
FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends curl ca-certificates unzip \
  && rm -rf /var/lib/apt/lists/*

ARG DANESHARA_ZIP_URL=https://tmpfiles.org/dl/1792844273.454a84c1f0d7cf71/wdAAUjrBu4Ve/daneshara-front-v1-no-prefill.zip
RUN curl -fsSL -o /tmp/daneshara.zip "$DANESHARA_ZIP_URL" \
  && unzip -q /tmp/daneshara.zip -d /tmp \
  && cp -a /tmp/daneshara/. /app/ \
  && rm -rf /tmp/daneshara.zip /tmp/daneshara \
  && test -f /app/package.json && test -f /app/next.config.ts \
  && grep -q skipTrailingSlashRedirect /app/next.config.ts \
  && grep -q 'api/:path' /app/next.config.ts \
  && test -f /app/src/components/otp-input.tsx \
  && test -f /app/src/components/sms-otp-form.tsx \
  && ! grep -q 09394575225 /app/src/components/sms-otp-form.tsx \
  && grep -q 09394575225 /app/src/lib/data.ts

RUN npm ci && npm run build

ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=3000

EXPOSE 3000

CMD ["npx", "next", "start", "--hostname", "0.0.0.0", "--port", "3000"]
