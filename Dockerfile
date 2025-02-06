# Stage 1: Compile and Build angular codebase
FROM node:20-alpine as builder

ARG environment
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

# Generate the build of the application
RUN mkdir -p ./src/assets/uswds/img/
RUN cp -r node_modules/@uswds/uswds/dist/img/* ./src/assets/uswds/img/
RUN yarn run build-dev

# Stage 2: Serve app with nginx server
FROM nginx:1.27.2-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

# Copy the build output to replace the default nginx contents.
COPY --from=builder /app/dist .
COPY --from=builder /app/dist/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80