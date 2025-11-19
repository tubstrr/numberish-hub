# Use the Node alpine official image
# https://hub.docker.com/_/node
FROM node:lts-alpine AS build

# Create and change to the app directory.
WORKDIR /app

# Copy package files first for better caching
COPY src/nuxt/package.json ./

# Install packages
RUN npm install

# Copy local code to the container image.
# Copy source code
COPY /src/nuxt ./

# Build the app.
RUN npm run build

# # Copy files to the container image.
# COPY --from=build /app ./

# Serve the app
CMD ["npx", "nuxi", "start"]