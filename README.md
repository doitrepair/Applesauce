#Applesauce
##File Structure
* app/
  - models/
  - routes/
    * api/
      - answers.js
      - questions.js
         * repair.js
* node_modules/
* public/
  - app/
    * controllers/
      - mainCtrl.js
    * services/
      - answerService.js
      - questionService.js
      - repairService.js
    * views/
      - pages/
        * index.html
    * app.js
    * app.routes.js
  - assets/
    * css/
      - style.css
    * img/
    * js/
    * libs/
--- config.js
--- package.json
--- server.js

## Definitions for the Main Directories

### app/
The app directory holds all of the backend code asside from the server.js, config.js, and package.json that are located in the application's main directory

### node_modules/
This is the auto-generated folder containing all of the necessary dependencies that node uses in this application

### public/
The public directory holds all of the front-end files for the application

## File Definitions - Backend

### /app/routes/api/answers.js
*The answers router relates the following html calls, appended to **applesauce.doit.wisc.edu/api/answers**, with their corresponding database queries.*

| HTTP call | Corresponding Database Query |
| --- | --- |
| GET / | SELECT * from answers |
| POST / | INSERT into answers (answer_id, question_id = req.body.q_id, answer_text = req.body.text, continue = req.body.cont, next_id = req.body.next_id) |
| GET /:id | SELECT * from answers WHERE question_id = req.params.id |
| DELETE /:id | DELETE FROM answers WHERE question_id = req.params.id |
| GET /ans/:id | SELECT * from answers WHERE answer_id = req.params.id |
| PUT /ans/:id | UPDATE answers SET question_id = req.body.q_id, answer_text = req.body.text, continue = req.body.cont, next_id = req.body.next_id WHERE answer_id = req.params.id |
| DELETE /ans/:id | DELETE FROM answers WHERE answer_id = req.params.id |

This router is accessing the answers database which is of the form:

| answer_id | question_id | answer_text | continue | next_id |
| -- | --- | --- | --- | --- |
| Id of this answer | Id of the Question being asked | Text of this answer | boolean representing whether the result points to another question (true), or a leaf-node (false) | the id of the next question or leaf node case |

### /app/routes/api/questions.js
*The questions router relates the following html calls, appended to **applesauce.doit.wisc.edu/api/questions**, with their corresponding database queries.*

| HTTP call | Corresponding Database Query |
| --- | --- |
| GET / | SELECT * from questions |
| POST / | INSERT into questions (question_id, question_text = req.body.text) |
| GET /:id | SELECT * from questions WHERE question_id = req.params.id |
| PUT /:id | UPDATE questions SET question_text = req.body.text WHERE question_id = req.params.id |
| DELETE /:id | DELETE FROM questions WHERE questions_id = req.params.id |

This router is accessing the questions database which is of the form:

| question_id | question_text |
| -- | --- |
| Id of this question | Text of this question |

### /app/routes/api/repair.js
*The repair router relates the following html calls, appended to **applesauce.doit.wisc.edu/api/repair**, with their corresponding database queries.*

| HTTP call | Corresponding Database Query |
| --- | --- |
| GET / | SELECT * from repair |
| POST / | INSERT into repair (repair_id, definition = req.body.def) |
| GET /:id | SELECT * from repair WHERE repair_id = req.params.id |
| PUT /:id | UPDATE repair SET definition = req.body.def WHERE repair_id = req.params.id |
| DELETE /:id | DELETE FROM repair WHERE repair_id = req.params.id |

This router is accessing the repair database which is of the form:

| repair_id | definition |
| -- | --- |
| Id of this repair | Displayed text to the user |