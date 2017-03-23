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

### /app/routes/api/questions.js
**The questions router defines the following routes off of /api/questions as database queries.**
| HTTP call | Corresponding Database Query
| --- | --- |
| GET / | SELECT * from questions |
| POST / | INSERT into questions (question_id, question_text = req.body.text) |
| GET /:id | SELECT * from questions WHERE question_id = :id |
| PUT /:id | UPDATE questions SET text = req.body.text WHERE question_id = req.body.id |
| DELETE /:id | DELETE FROM questions WHERE questions_id = req.body.id |


### /app/routes/api/repair.js
