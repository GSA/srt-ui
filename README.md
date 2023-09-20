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
* Navigate to the desired folder to clone the srt-ui project. 
* Then execute the following in the command line: 
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
Execute the following command to install yarn: 
```
npm install –global yarn
```
Alternatively, you can install yarn on Mac OS with the following command: 
```
brew install yarn
```
For more information on installing yarn, refer to the detailed information here: <https://classic.yarnpkg.com/en/docs/install#mac-stable>

## Running the Project 
* Run `ng serve` to start the SRT client locally. 
* Then open a browser to this URL: <http://localhost:4200/>. 
* Run `ng build` to build the project. 
## Deployment 
