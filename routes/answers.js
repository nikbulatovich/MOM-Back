const express = require("express");
const router = express.Router();

const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("survey_answers.csv");

const { insertAnswer, getAnswers, getAnswersByQuestionId, getAnswersByAnswerId, getAnswersByPersonId} = require('../db/answers')

router.post('/', async (req, res) => {
  const personID = req.body.person_id;
  const optionID = req.body.option_id;
  const results = await insertAnswer(personID, optionID)
  res.send(results)
})

router.get("/answers", async (req, res) => {
  let results = await getAnswers();
  res.send(results.rows);
});

router.get("/answers/:csv", async (req, res) => {
  let results = await getAnswers();
  const jsonData = JSON.parse(JSON.stringify(results.rows));
  fastcsv
    .write(jsonData, { headers: true })
    .on("finish", function(){
      console.log("Write to survey_answers.csv successful");
    })
    .pipe(ws);
})

router.get('/answers/:questionId/answers', async(req, res) => {
    const question_id = parseInt(req.params.question_id)
    let results = await getAnswersByQuestionId(question_id)
    res.send(results.rows)
})

router.get('/answers/:answerId/answers', async(req, res) => {
    const answer_id = parseInt(req.params.answer_id)
    let results = await getAnswersByAnswerId(answer_id)
    res.send(results.rows)
})

router.get('/answers/:personId/answers', async (req, res) => {
    const person_id = parseInt(req.params.person_id)
    let results = await getAnswersByPersonId(person_id)
    res.send(results.rows)
})

module.exports = router

