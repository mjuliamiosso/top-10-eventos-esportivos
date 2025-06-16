# prod only
FROM node:18-slim
WORKDIR /app

# copy app files
COPY .next ./.next
COPY public ./public
COPY next.config.ts ./next.config.ts
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
COPY node_modules ./node_modules

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
