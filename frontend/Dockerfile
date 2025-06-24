# install and builder
FROM node:18-slim AS builder
WORKDIR /app

# copy package manifests
COPY package.json package-lock.json ./

# install deps
RUN npm ci

# copy source
COPY . .

# inject directus url at build time
ARG NEXT_PUBLIC_DIRECTUS_URL
ENV NEXT_PUBLIC_DIRECTUS_URL=${NEXT_PUBLIC_DIRECTUS_URL}

# build the Next.js app
RUN npm run build

# prod image
FROM node:18-slim AS runner
WORKDIR /app

# copy prod deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# copy build output and public assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# runtime environment
ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]
