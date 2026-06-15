FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
ENV HTTP_PROXY=http://172.23.0.4:2003
ENV HTTPS_PROXY=http://172.23.0.4:2003
ENV http_proxy=http://172.23.0.4:2003
ENV https_proxy=http://172.23.0.4:2003
RUN npm config set registry https://npm.mirrors.msh.team \
    && npm config set proxy $HTTP_PROXY \
    && npm config set https-proxy $HTTPS_PROXY \
    && npm config set strict-ssl false \
    && npm config set fund false \
    && npm config set audit false
RUN --mount=type=cache,target=/root/.npm \
    npm ci --prefer-offline --no-audit

FROM deps AS build
COPY . .
RUN npm run build

FROM base AS production
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/.env ./

EXPOSE 3000
CMD ["node", "server.js"]
