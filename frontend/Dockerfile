FROM node:18-slim
WORKDIR /app

# copy ready files
COPY .next .next
COPY public ./public
COPY next.config.ts ./next.config.ts
COPY package.json ./package.json

# dependencies
RUN npm ci --omit=dev

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
