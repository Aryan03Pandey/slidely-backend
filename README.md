## Slidely AI Internship - Backend Server

This repository contains the backend server code for the forms application.

**Server Details:**

* Base URL: http://localhost:3000
* Available Endpoints:
    * `/ping`: Verify that the server is running and responding.
    * `/read?index=idx`: Get a submission given its index. (Replace `idx` with the actual index number)
    * `/submit`: Add a submission to the database.
    * `/count`: Get the total count of submissions in the database.
    * `/edit?index=idx`: Edit a submission with new data given its index. (Replace `idx` with the actual index number)
    * `/delete?index=idx`: Delete a submission given its index. (Replace `idx` with the actual index number)
    * `/search?email=text`: Search for submissions made using the given email. (Replace `text` with the email address)

**Running the Server Locally:**
* create a new folder and navigate to that directory
* run `git init` to initialize an empty git repo
* run `git clone https://github.com/Aryan03Pandey/slidely-backend.git` to clone this repository
* navigate to the slidely-backend directory by `cd slidely-backend`
* run `npm install` to install the npm packages
* run `tsc` to compile the typescript file
* navigate to /dist directory by running `cd dist/`
* run `node index.js` to run the server

**Making server requests**
Use the request.rest file to easily make requests to the server. It has endpoints already written for convenience. Make sure that REST Client extension is installed in your VS Code.