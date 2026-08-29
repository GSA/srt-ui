# Stage 1: Compile and Build angular codebase
FROM node:20-alpine AS builder

ARG environment
ENV BUILD_ENV=${environment}

WORKDIR /app

# Install Python and build dependencies
RUN apk add --no-cache python3 make g++

# npm ci, not yarn: this repo has no yarn.lock, so `yarn install` resolved
# dependencies fresh from package.json ranges on every build — two builds of the
# same source could ship different trees. npm ci installs exactly what
# package-lock.json pins and fails loudly if the lockfile has drifted.
# .npmrc carries legacy-peer-deps — without it npm ci fails on the
# @angular/animations peer conflict. It must be present before npm ci runs.
COPY package.json package-lock.json .npmrc ./

COPY .snyk ./
RUN npm ci

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

CMD sed -i -e 's/listen 80;/listen '"${PORT:-8080}"';/g' /etc/nginx/nginx.conf && nginx -g 'daemon off;'