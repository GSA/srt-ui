# Stage 1: Compile and Build angular codebase

# base image
FROM node:16-alpine as builder

# install chrome for protractor tests
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
# RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
# RUN apt-get update && apt-get install -yq google-chrome-stable

# Get passed in Arguments
ARG environment

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY .snyk ./
COPY yarn.lock ./

RUN yarn install

# Add the source code to app
COPY . /app/

# Generate the build of the application
RUN yarn run build-${environment}

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:alpine

# Making the files for nginx logs
RUN mkdir -p /app/nginx/logs
RUN touch /app/nginx/logs/error.log
RUN touch /app/nginx/logs/access.log
# Copy the build output to replace the default nginx contents.
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/dist/nginx.conf /etc/nginx/nginx.conf


# Expose port 8080
# EXPOSE 8080

ENTRYPOINT ["nginx", "-g", "daemon off;"]