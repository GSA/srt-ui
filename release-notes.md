# SRT Client Release Notes

## v0.1-230615 - June 2023
### Features
* Updated from Angular 9 to 15
* Used primeng Tooltips instead of ng2-tooltips
### Security Fixes
* Removed unneeded update package 

## v0.0-230525 - May 2023
### Features
* Added the URL to the export CSV
* Add the SAM Link to the Table as a hyperlink for Sol ID

## Sprint 10 Release Notes - January 2022
### Features
* Fix Point of Contact formatting to work with Array returned by updated sam.gov data
### Security Fixes
* Package updates
* S3 bucket legacy code removal

## Sprint 9 Release Notes - September 2021
### Features 
* package updates for SNYK and npm audit security fixes
* Adding feature flag to toggle Energy Star UI changes
* UI updates for EPA demo functionality
### Security Fixes
* stability fixes to handle bad data and also adding some logging
* Fixed the solicitation.contactInfo type

## Sprint 8 Release Notes - April 2021
### Features
* Improved font contrasts to meet AAA 508 Compliance
* Modified button colors to meet AAA 508 Compliance
* Modified the system analytics to include both the new and updated solicitations for the Scanned Solicitations chart
* Added ability to download a CSV of the Scanned Solicitations data
* Added Metric Downloads page to the Administration page
* Added Predictions Metrics by Date and Agency report
* Added Notice Type Change Metrics report.
### Security updates
* Bug fix - Fixed issue causing crash on the Analytics page when an agency without a documented abbreviation is used

## Sprint 7 Release Notes
### Features
* Added user login report bar chart
* Time range select for user login report bar chart
* Added visually hidden copy of bar chart data for screen readers
* Added user login report table
* User login data download in CSV format
* Added user feedback report table with global search and resizable columns
* Added links to feedback and solicitation details to feedback table
* Feedback data download in CSV format
### Content
* Updated home page text
* Added 2 questions/answers to the FAQ page
* Updated Contact Us page to include link to ART
* Continuous Integration / Continuous Deployment Changes
* Added continuous deployment to cloud.gov
* Added cloud.gov space specific service account credential support
### Security
* Removed unused NPM modules
### Fixes
* Replaced toLocaleString() function calls with the moment NPM module to prevent unicode characters in date strings
* IE fixes for FAQ pages
* IE compatibility fix for the solicitation NA flag

## Sprint 6 Release Notes


## Sprint 5 Release Notes - June 2020

### Features
* Added user login report bar chart
* Time range select for user login report bar chart
* Added visually hidden copy of bar chart data for screen readers 
* Added user login report table
* User login data download in CSV format 
* Added user feedback report table with global search and resizable columns
* Added links to feedback and solicitation details to feedback table
* Feedback data download in CSV format 

### Content
* Updated home page text
* Added 2 questions/answers to the FAQ page
* Updated Contact Us page to include link to ART

### Continuous Integration / Continuous Deployment Changes
* Added continuous deployment to cloud.gov
* Added cloud.gov space specific service account credential support


### Security
* Removed unused NPM modules 

### Fixes
* Replaced toLocaleString() function calls with the moment NPM module to prevent unicode characters in date strings
* IE fixes for FAQ pages
* IE compatibility fix for the solicitation NA flag 




