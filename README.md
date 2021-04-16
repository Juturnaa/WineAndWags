# WineAndWags
This project was a brief 1-week sprint where our team of 7 engineers were assigned to complete and MVP for two clients, Bruce & Stacy. The MVP was to be built from scratch, front to end and was designed to be a dating application for human and dogs. The features include being able to make an account, having preferences, matching with another user, notifications, calendar to make appointments, editing profile, and map of dog friendly places near the user. 

## Table of Contents
* [Technologies](#technologies "Goto technologies")
* [Authentication](#authentication "Goto authentication")
* [Getting started](#getting-started "Goto getting-started")

## Technologies 
* ReactJS@V16
* Webpack@V4
* Babel@V7
* Express
* NodeJS
* Material-UI 
* FortAwesome 
* PostgreSQL
* AWSs3

## Authentication
We used bcrypt to authenticate our password for our users account when logging into the application. 
> __Note:__ Make sure to keep all of authentication key's confidential and follow the example files for inputting the key to access the correct things.
* __YelpAPI__ We use YelpAPI to recover yelp's data to locate where the dog friendly places are aroud the user for the map component. 
  * You do need a yelp account to access the authorization key. 
  * https://www.yelp.com/developers/v3/manage_app - make an App and Yelp will give you a ClientID and API Key.
* __AWSAPI__ We use the AWSAPI to access the s3 storage for being able to upload photos to the database. 
  * Sign into AWS and go to IAM department. 
  * Create a user and you will recieve access key ID and secret access key. 
* __GoogleAPI__ The GoogleAPI is used to retrieve the google maps layout for the mapping component. 

## Getting Started
1. Install the dependencies. 
  ```
  npm install 
  ```
2. Create the access keys that are directed in [Authentication](#authentication "Goto authentication") and fill out the proper files under config folder. 
   * dbConfig.js → Access file to connect to PostgreSQL. 
   * awsConfig.js → Insert AWS IAM Key. 
   * yelpKey.js → Insert YelpAPI Key. 
   * googleConfig.js → Insert GoogleAPI Key. 
3. Run the schema file into your local database. ``` psql -U [username] < server/db/schema.sql ```
4. Run the seeding functions into your database. Please run them in the chronological order below. 
   1. usersSeed.js
   2. dogSeed.js
   3. photoSeed.js
   4. filterSeed.js
   5. matchesSeed.js
   6. notifSeed.js
   7. photosLikedSeeder.js
5. Build the application. 
  ```
  npm run build
  ```
6. Start the application.
  ```
  npm run start
  ```
7. Navigate to ```localhost:3000```
<!------
1. git remote add juturna https://github.com/Juturnaa/WineAndWags.git
2. git fetch --all
3. git pull juturna testing
4. git checkout -b "your branch name"
5. git add .
6. git commit -m 'your message'
7. git push origin "your branch name"
8. go to git hub and make PR
9. psql -U michaelbanuelos < server/db/schema.sql
psql -U postgres < server/db/schema.sql
----->
