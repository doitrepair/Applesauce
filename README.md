# Applesauce

This project is designed for the use of the DoIT Tech Store at UW - Madison to
improve the flow of customers checking in computers for repair services.

The goal of this project is to provide an easy-to-use website that will take customers through a series of directed questions with the purpose of receiving a diagnostic on their computer. If a customer’s computer requires a repair, the site will generate a check-in form that can be signed at the store. This allows the customer to simply stop by the DoIT Tech Store, drop off their computer, and sign the check-in form with little to no waiting for service or diagnostics.

## Front-End: Client-Side Code

## File Structure
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

### Public Directory
Coming Soon

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

### App Directory

This directory stores all of the files necessary for the backend with the
exceptions of the node_modules directory, config.js, package.json and
server.js (discussed below).

#### Router Files

This website requires specific routers to make calls to the app's database in
order to retrieve the necessary data to run the app. Their are three main routers, described below:

**app/routes/api/answers.js**
*The answers router relates the following html calls, appended to __**applesauce.doit.wisc.edu/api/answers**,__ with their corresponding database queries.*

| HTTP call | Corresponding Database Query |
| --- | --- |
| GET / | SELECT * from answers |
| POST / | INSERT into answers (answer_id, question_id = req.body.q_id, answer_text = req.body.text, continue = req.body.cont, next_id = req.body.next_id) |
| GET /questionid/:id | SELECT * from answers WHERE question_id = req.params.id |
| DELETE /questionid/:id | DELETE FROM answers WHERE question_id = req.params.id |
| GET /answerid/:id | SELECT * from answers WHERE answer_id = req.params.id |
| PUT /answerid/:id | UPDATE answers SET question_id = req.body.q_id, answer_text = req.body.text, continue = req.body.cont, next_id = req.body.next_id WHERE answer_id = req.params.id |
| DELETE /answerid/:id | DELETE FROM answers WHERE answer_id = req.params.id |

**app/routes/api/questions.js**
*The questions router relates the following html calls, appended to __**applesauce.doit.wisc.edu/api/questions**,__ with their corresponding database queries.*

| HTTP call | Corresponding Database Query |
| --- | --- |
| GET / | SELECT * from questions |
| POST / | INSERT into questions (question_id, question_text = req.body.text) |
| GET /:id | SELECT * from questions WHERE question_id = req.params.id |
| PUT /:id | UPDATE questions SET question_text = req.body.text WHERE question_id = req.params.id |
| DELETE /:id | DELETE FROM questions WHERE questions_id = req.params.id |


**app/routes/api/repairs.js**
*The repair router relates the following html calls, appended to __**applesauce.doit.wisc.edu/api/repairs**,__ with their corresponding database queries.*

| HTTP call | Corresponding Database Query |
| --- | --- |
| GET / | SELECT * from repair |
| POST / | INSERT into repair (repair_id, definition = req.body.def) |
| GET /:id | SELECT * from repair WHERE repair_id = req.params.id |
| PUT /:id | UPDATE repair SET definition = req.body.def WHERE repair_id = req.params.id |
| DELETE /:id | DELETE FROM repair WHERE repair_id = req.params.id |

__Note that all of the database tables are located in the Database section below__

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

| Answer ID (Primary Key) | question_id | answer_text | continue | next_id |
| -- | --- | --- | --- | --- |
| Id of this answer | Id of the Question being asked | Text of this answer | boolean representing whether the result points to another question (true), or a leaf-node (false) | the id of the next question or leaf node case |

### Questions Table
The Questions table follows the following format:

| Question ID (Primary Key) | q_sum | question_text |
| -- | -- | -- |
| Id of this question | Short description of question | Text of this question |

### Repairs Table
The Repairs table follows the following format:

| repair_id | definition |
| -- | --- |
| Repair Id (Primary Key) | Displayed text to the user |
