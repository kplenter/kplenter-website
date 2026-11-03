# Build the static site with Node 26 + pnpm 10, then serve ./dist with nginx.

FROM node:26-alpine AS build
WORKDIR /app

# Node 25+ no longer ships corepack, so install pnpm directly.
RUN npm install -g pnpm@10

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM nginx:1.29-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
