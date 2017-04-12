# Applesauce

This project is designed for the use of the DoIT Tech Store at UW - Madison to
improve the flow of customers checking in computers for repair services.

The goal of this project is to provide an easy-to-use website that will take customers through a series of directed questions with the purpose of receiving a diagnostic on their computer. If a customer’s computer requires a repair, the site will generate a check-in form that can be signed at the store. This allows the customer to simply stop by the DoIT Tech Store, drop off their computer, and sign the check-in form with little to no waiting for service or diagnostics.

## Front-End: Client-Side Code

### File Structure
* public/
  - app/
    * controllers/
    * services/
    * views/
    * app.js
    * app.routes.js
  - assets/
    * css/
      - style.css
    * libs/
	  - uwmadison_templates/

**Note:** All of the front end files are stored in the public directory

### public/app/controllers/
The files in the controllers directory define the functionality of each webpage, defining how to set up each page initially and how to change the page with user input

#### mainCtrl.js
The main controller defines the functionality of the main.html template

#### questionCtrl.js
The questions controller defines the functionality of the questions.html template

#### repairCtrl.js
The repair controller defines the functionality of the repair-form.html template

### public/app/services/
The services directory defines any of the extra functions needed by the controllers

#### dbServices.js
The db service defines all of the HTTP calls necessary to retrieve data from the app's database

#### submitRepair.js
The submit repair service submits the repair to DoIT's ticketing software.

### public/app/views/
The views directory defines all of the html needed for the website.

**Note: the html for this site is based off of the UW Madison template located in public/assets/libs/uwmadison_templates/**

#### index.html
index.html is the main page that is loaded every time, it defines areas like the header and footer and takes in templates for specific pages

#### pages/home.html
home.html is the template used for the home page

#### pages/questions.html
questions.html is the template used for the question / answer page

#### pages/repair-form.html
repair-form.html is the template used for the form page that collects a user's information.

### public/app/app.js
This file defines the angular app that runs the webpage

### public/app/app.routes.js
This file defines which templates to use on certain routes

### public/assets/css
This directory defines any css code that is written for the website

### public/assets/libs
This directory stores any code that is used from another author

#### uwmadison_templates
This directory contains all of the un-altered template files used for the website as well as any other code needed for the templates to run.

## Back-End: Server-Side Code

### File Structure
* app/
  - routes/
    * api/
* node_modules/
* public/
* config.js
* package.json
* server.js

### app/routes/api/
This website requires specific routers to make calls to the app's database in
order to retrieve the necessary data to run the app. Their are three main routers, described below:

#### answers.js
The answers router relates the following html calls, appended to **applesauce.doit.wisc.edu/api/answers**, with their corresponding database queries.

| HTTP call | Corresponding Database Query |
| --- | --- |
| GET / | SELECT * from answers |
| POST / | INSERT into answers (answer_id, question_id = req.body.q_id, answer_text = req.body.text, continue = req.body.cont, next_id = req.body.next_id) |
| GET /questionid/:id | SELECT * from answers WHERE question_id = req.params.id |
| DELETE /questionid/:id | DELETE FROM answers WHERE question_id = req.params.id |
| GET /answerid/:id | SELECT * from answers WHERE answer_id = req.params.id |
| PUT /answerid/:id | UPDATE answers SET question_id = req.body.q_id, answer_text = req.body.text, continue = req.body.cont, next_id = req.body.next_id WHERE answer_id = req.params.id |
| DELETE /answerid/:id | DELETE FROM answers WHERE answer_id = req.params.id |

#### questions.js
The questions router relates the following html calls, appended to **applesauce.doit.wisc.edu/api/questions**, with their corresponding database queries.

| HTTP call | Corresponding Database Query |
| --- | --- |
| GET / | SELECT * from questions |
| POST / | INSERT into questions (question_id, question_text = req.body.text) |
| GET /:id | SELECT * from questions WHERE question_id = req.params.id |
| PUT /:id | UPDATE questions SET question_text = req.body.text WHERE question_id = req.params.id |
| DELETE /:id | DELETE FROM questions WHERE questions_id = req.params.id |


#### repairs.js
The repair router relates the following html calls, appended to **applesauce.doit.wisc.edu/api/repairs**, with their corresponding database queries.

| HTTP call | Corresponding Database Query |
| --- | --- |
| GET / | SELECT * from repair |
| POST / | INSERT into repair (repair_id, definition = req.body.def) |
| GET /:id | SELECT * from repair WHERE repair_id = req.params.id |
| PUT /:id | UPDATE repair SET definition = req.body.def WHERE repair_id = req.params.id |
| DELETE /:id | DELETE FROM repair WHERE repair_id = req.params.id |


### node_modules

This directory is created by node and holds all of the required packages to run the server.

### config.js

** Note, the file located in the in the GitHub repository is just an example, actual configuration data is not available publicly for security reasons **

This file contains all of the configuration data for the server.

### server.js

This file defines the basic functions necessary to start the server and connect it to the database.

### package.json

This file is required by the server and contains the meta-data for the server


## Database Definitions

### Answers Table
The Answers table follows the following format:

| answer_id | question_id | answer_text | continue | next_id |
| -- | --- | --- | --- | --- |
| Answer ID (Primary Key) | Id of the Question being asked | Text of this answer | boolean representing whether the result points to another question (true), or a leaf-node (false) | the id of the next question or leaf node case |

### Questions Table
The Questions table follows the following format:

| question_id | q_sum | question_text |
| -- | -- | -- |
| Question ID (Primary Key) | Short description of question | Text of this question |

### Repairs Table
The Repairs table follows the following format:

| repair_id | definition |
| -- | --- |
| Repair Id (Primary Key) | Displayed text to the user |
