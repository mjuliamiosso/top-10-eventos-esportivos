# prod
FROM node:18-slim
WORKDIR /app

# prod dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# build artifacts
COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# app
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
