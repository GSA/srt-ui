# Stage 1: Compile and Build angular codebase

# base image
FROM node:16

# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

# set working directory
WORKDIR /app

# install app dependencies
COPY package*.json /app

RUN npm install
RUN npm install -g @angular/cli@7.3.9

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Add the source code to app
COPY . /app/

# Generate the build of the application
RUN npm run build

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY /src/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80