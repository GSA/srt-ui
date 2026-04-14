# Overview 
The SRT UI is a Javascript web application built using Angular (v. 15) which along with the [SRT API](https://github.com/GSA/srt-api) deliver the [Solicitation Review Tool](https://srt.app.cloud.gov/auth) for viewing Section 508 compliance predictions for Information and Communication Technology (ICT) solicitations submitted from agencies around the federal government. To facilitate development and testing in addition to production deployment, a total of three instances of this client application run on cloud.gov - development, staging and production. 

SRT UI is now deployed to cloud.gov using a Docker image and security updates for all Node modules and software components are managed with yarn and SNYK. This application accesses ICT solicitation data that is housed in a PostgreSQL database on cloud.gov and is updated on a daily basis through a cron job that runs the [SRT FBO Scraper](https://github.com/GSA/srt-fbo-scraper) to pull all of the latest solicitations from SAM.GOV. 

# Developer Requirements 
## Software Components and Tools 
The following is a summary of the software and tools that are needed for development of this project: 
* Operating system - Linux, Ubuntu, Mac OS, Windows 
* IDE - Visual Studio Code, etc. 
* Angular 
* Docker 
* PostGreSQL
* SNYK 
* Node 
* Yarn 
## Systems Access 
Access to the following platforms will also be required for development: 
* Cloud.gov 
* SAM.gov 
* MAX.gov 
* Docker 
* SNYK 
* GitHub - GSA team 
# Setup and Deployment  
## Getting Started
### Download SRT Source Code 
For both Mac and Ubuntu: 
* In the command line, navigate to the desired folder to clone the srt-ui project. 
* Then execute the following command: 
```
git clone https://github.com/GSA/srt-ui.git
cd srt-ui
git checkout dev
```
## Installation 
### Install Node Package Manager (npm)
Mac:
```
brew install npm
```
Ubuntu:
```
sudo apt-get install -y nodejs npm
sudo npm install npm@latest -g
```
### Install Angular  
The following command will install the Angular CLI globally: 
```
npm install -g @angular/cli
```

To update the CLI to the latest version: 
```
npm install -g @angular/cli@latest 
```
For more detailed instructions on setting up your local environment with Angular, go here: <https://angular.io/guide/setup-local>. 
### Install Docker
Install the Docker engine for various platforms by referring to the documentation here: <https://docs.docker.com/engine/install/> 
### Install PostgreSQL
Mac:
```
brew install postgresql
```

Ubuntu:
```
sudo apt install postgresql-client libpq-dev postgresql-server-dev pgadmin
```
### Install SNYK
* During this installation you will be redirected to the SNYK website.
* Complete your authentication at SNYK before proceeding to the next step.
```
echo "Installing snyk..."
npm install snyk -g


echo "Authenticating snyk..."
snyk auth
```
### Install Node Version Manager (nvm)
Mac:
```
brew install nvm

mkdir ~/.nvm

echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.bash_profile
echo '[ -s "/usr/local/opt/nvm/nvm.sh" ] && \. "/usr/local/opt/nvm/nvm.sh"' >> ~/.bash_profile
echo '[ -s "/usr/local/opt/nvm/etc/bash_completion" ] && \. "/usr/local/opt/nvm/etc/bash_completion"' >> ~/.bash_profile

source ~/.bash_profile
```
Ubuntu:
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

source ~/.bashrc
```
### Install Yarn 
For the most up-to-date information on installing yarn on your system, go to this website: <https://yarnpkg.com/getting-started/install>.

Note: npm is no longer the recommended way to install yarn. 

### Install Node Modules with YARN
In the project directory run:
```
yarn
```

## Running the Project 
* Run `yarn dev` to start the SRT client locally. 
* Then open a browser to this URL: <http://localhost:4200/>. 
* Run `yarn build-<env>` to build the project. (Not needed for deployment)

## Deployment 
### Build the Docker Image
####  Development 
```
docker build . -t <docker_username>/srt-ui:<release_version>-dev --build-arg environment=dev 
```
####  Staging 
```
docker build . -t <docker_username>/srt-ui:<release_version>-staging --build-arg environment=staging 
```
#### Production 
```
docker build . -t <docker_username>/srt-ui:<release_version>-prod --build-arg environment=prod 
```
### Push to Docker  
####  Development 
```
sudo docker push <docker_username>/srt-ui:<release_version>-dev 
```
####  Staging 
```
sudo docker push <docker_username>/srt-ui:<release_version>-staging 
```
#### Production 
```
sudo docker push <docker_username>/srt-ui:<release_version>-prod 
```
### Deploy to Cloud.gov
####  Development 
```
cf push srt-ui-dev -f cf/manifest.dev.yml --docker-image <docker_username>/srt-ui:<release_version>-dev
```
####  Staging 
```
cf push srt-ui-staging -f cf/manifest.staging.yml --docker-image <docker_username>/srt-ui:<release_version>-staging
```
#### Production 
```
cf push srt-ui-prod -f cf/manifest.prod.yml --docker-image <docker_username>/srt-ui:<release_version>-prod
```







