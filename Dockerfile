# Stage 1: Build the React Frontend
FROM node:22-slim AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ .
RUN npm run build

# Stage 2: Build the Node.js Backend
FROM node:22-slim
WORKDIR /app
COPY server/package*.json ./
RUN npm ci --only=production
COPY server/ .

# Copy built frontend from Stage 1 to server's public location
COPY --from=client-build /app/client/dist /client/dist

# Set production environment
ENV NODE_ENV=production
EXPOSE 5000

CMD ["npm", "start"]
