# build
FROM node:18-alpine AS builder
WORKDIR /app

# dependencies
COPY package*.json ./
RUN npm install

# build
COPY . .
RUN npm run build

# prod
FROM node:18-alpine
WORKDIR /app

# prod dependencies
COPY package*.json ./
RUN npm install --production

# build artifacts
COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
