# SRT Client Release Notes

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




