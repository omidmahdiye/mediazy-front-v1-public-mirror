# Mirror overlays (72h TTL)

Dockerfile curls these litterbox URLs during Coolify build to replace MCP-sized stubs.

| path | url | bytes |
| --- | --- | ---: |
| `favicon.ico.b64` | https://litter.catbox.moe/6fjjf6.b64 | 20117 |
| `src/lib/data.ts` | https://litter.catbox.moe/6dipq7.ts | 30953 |
| `src/app/player/[slug]/player-view.tsx` | https://litter.catbox.moe/mz7koh.tsx | 25007 |
| `src/app/(site)/courses/[slug]/page.tsx` | https://litter.catbox.moe/0rs8wo.tsx | 23884 |
| `package-lock.json` | https://litter.catbox.moe/yfhbfv.json | 56102 |

Re-upload from `/workspace` if URLs expire before the next Coolify build.
