# ----- Build Stage -----
FROM node:alpine AS build-stage

WORKDIR /srv/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the application's dependencies
RUN npm install

# Copy the rest of the application to the working directory
COPY . .

# Build the Vite application for production
RUN npm run build

# ----- Production Stage -----
FROM nginx:alpine AS production-stage

# Copy the built app to the nginx directory
COPY --from=build-stage /srv/app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 5173
EXPOSE 5173

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
