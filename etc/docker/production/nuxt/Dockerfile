# syntax=docker/dockerfile:1

# ---- Build stage -------------------------------------------------------
# Compiles the Nuxt app into a self-contained .output/ bundle.
FROM node:lts-alpine AS build

WORKDIR /app

# Copy manifests first so the dependency layer caches independently of source.
# package-lock.json is included so `npm ci` can produce a reproducible install.
COPY src/nuxt/package.json src/nuxt/package-lock.json ./

# `postinstall` runs `nuxt prepare`, which needs the config to be present.
RUN npm ci --ignore-scripts

COPY src/nuxt ./

RUN npm run build


# ---- Runtime stage -----------------------------------------------------
# Ships only the Nitro output — no source, no devDependencies, no npm install.
FROM node:lts-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production \
    NUXT_HOST=0.0.0.0 \
    NUXT_PORT=3000

COPY --from=build /app/.output ./.output

# node:alpine ships an unprivileged `node` user; run as it rather than root.
USER node

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
