# production
FROM node:18-slim
WORKDIR /app

# dependencies
COPY package*.json ./
COPY node_modules/ ./node_modules

# build
COPY .next/ ./.next
COPY public/ ./public
COPY next.config.ts ./next.config.ts

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
