const express = require("express");
const router = express.Router();
const {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestionById,
  deleteQuestionById,
} = require("../db/questionnaires");

router.get("/questions", async (req, res) => {
  results = await getQuestions();
  res.send(results.rows);
});

router.get("/questions/:questionId", async (req, res) => {
  const question_id = parseInt(req.params.question_id);
  results = await getQuestionById(question_id);
  res.send(results.rows);
});

router.post("/questions", async (req, res) => {
  const { survey_id, question_type, question } = req.body;
  results = await createQuestion(survey_id, question_type, question);
  res.send(`Question added with ID : ${results.question_id}`);
});

router.put("/questions/:questionId", async (req, res) => {
  const question_id = parseInt(req.params.question_id);
  const { survey_id, question_type, question } = req.body;
  results = await updateQuestionById(
    question_id,
    survey_id,
    question_type,
    question
  );
  res.send(`Question modified with ID: ${question_id}`);
});

router.delete("/questions/:questionId", async (req, res) => {
  const question_id = parseInt(req.params.question_id);
  results = await deleteQuestionById(question_id);
  res.send(`Question deleted with ID: ${question_id}`);
});
module.exports = router;
