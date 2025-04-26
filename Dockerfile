# Stage 1: Compile and Build angular codebase
FROM node:20-alpine AS builder

ARG environment
ENV BUILD_ENV=${environment}

WORKDIR /app

# Install Python and build dependencies
RUN apk add --no-cache python3 make g++

# Remove phantomjs-prebuilt from dependencies before install
COPY package.json ./
RUN sed -i '/phantomjs-prebuilt/d' package.json

COPY .snyk ./
RUN yarn install

# Add the source code to app
COPY . /app/

# Copy USWDS assets
RUN mkdir -p src/assets/uswds/img && \
    cp -r node_modules/@uswds/uswds/dist/img/* src/assets/uswds/img/ && \
    mkdir -p src/assets/uswds/fonts && \
    cp -r node_modules/@uswds/uswds/dist/fonts/* src/assets/uswds/fonts/

# Generate the build of the application
RUN yarn run build-${BUILD_ENV}

# Stage 2: Serve app with nginx server
FROM nginx:1.28.0-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

# Copy the build output to replace the default nginx contents.
COPY --from=builder /app/dist .
COPY --from=builder /app/dist/nginx.conf /etc/nginx/nginx.conf

# Make sure nginx can access all files
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

EXPOSE 80