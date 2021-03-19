const db = require("../db");

const insertAnswer = async (personID, optionID) => {
  const result1 = await db.query(`
    SELECT question_id 
    FROM option
    WHERE option.option_id = $1
  `, [optionID])
  const questionID = result1.rows[0].question_id;

  await db.query(`
    DELETE FROM answer
    USING option
    WHERE answer.option_id = option.option_id AND option.question_id = $1
  `, [questionID])

  let results = await db.query("INSERT INTO answer (person_id, option_id) VALUES ($1, $2)", [personID, optionID])
}

const getAnswers = async () => {
  let results = await db.query("SELECT * FROM answer ORDER BY answer_id ASC");
  return results;
};

const getAnswersByQuestionId = async (question_id) => {
  let results = await db.query("SELECT * FROM answer WHERE question_id = $1", [
    question_id,
  ]);
  return results;
};

const getAnswersByAnswerId = async (answer_id) => {
  let results = await db.query("SELECT * FROM answer WHERE answer_id = $1", [
    answer_id,
  ]);
  return results.rows;
};

const getAnswersByPersonId = async (person_id) => {
    let results = await db.query('SELECT * FROM answer WHERE person_id = $1', [person_id])
    return results.rows;
}

module.exports = { 
    insertAnswer, getAnswers, getAnswersByQuestionId, getAnswersByAnswerId, getAnswersByPersonId
}
  

