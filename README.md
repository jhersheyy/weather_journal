# Weather-Journal App Project

## Overview
This project requires you to create an asynchronous web app that uses Web API and user data to dynamically update the UI. 

## Instructions
This will require modifying the `server.js` file and the `website/app.js` file. You can see `index.html` for element references, and once you are finished with the project steps, you can use `style.css` to style your application to customized perfection.

## Process
### Server file
First I set up my server file to use express, body-parser, and cors. I set the port and the get/ post routes in this file as well.

### App.js file
I saved the API url and developer key into variables to make querying the API easier. I then set an event listener to do a series of actions using chained promises and various functions on a button click. 

First the user input (zip and feelings) are saved into variables. Then the zip is put into a function that queries the weather API using the saved url and key. The weather data in addition to a date marker and the user's feelings input then gets posted. The UI is then updated dynamically from the newly posted data.

## Skeleton Code
All files were provided by Udacity to provide a foundation. I adjusted the styling and tweaked some id tags in the html. The app and server files were started mostly empty with the exception of a few comments and simple lines of code for getting the date and setting up body-parser.