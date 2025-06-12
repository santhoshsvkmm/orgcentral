# Stage 1: Build the Next.js application
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies based on your package manager
# Assumes package-lock.json is present for npm
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Set any build-time environment variables if necessary
# Example: ENV GOOGLE_API_KEY=your_build_time_key

# Build the Next.js application
RUN npm run build

# Stage 2: Create the production image from the standalone output
FROM node:20-alpine AS runner
WORKDIR /app

# Set environment variables (these should be configured when running the container)
ENV NODE_ENV production
# PORT is automatically set by Next.js standalone server.js, usually 3000.
# If you have runtime environment variables like API keys, define them here or pass at runtime
# Example: ENV GOOGLE_API_KEY=""

# Copy the standalone output from the builder stage
COPY --from=builder /app/.next/standalone ./
# Copy the public and static assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

# Start the Next.js application using the standalone server.js
CMD ["node", "server.js"]
