const db = require('../db');

const { selectOptionsByQuestionID } = require('./options');

const selectQuestionsBySurveyID = async (survey_id) => {
    results = await db.query('SELECT * FROM question WHERE survey_id = $1', [survey_id]);
    const questions = results.rows;
    for (let i = 0; i < questions.length; i++){
        questions[i].options = await selectOptionsByQuestionID(questions[i].question_id);
    }
    return questions;
}

const getQuestions = async() => {
    results = await db.query('SELECT * FROM questions ORDER BY question_id ASC')
    return results
}

const getQuestionById = async(question_id) => {
    results = await db.query('SELECT * FROM questions WHERE question_id = $1', [question_id])
    return results
}

const createQuestion = async(survey_id, question) => {
    results = await db.query('INSERT INTO question (survey_id, question) VALUES ($1, $2) RETURNING *',
    [survey_id, question])
    return results.rows[0].question_id;
}

const updateQuestionById = async(question_id, survey_id, question_type, question) => {
    results = await db.query('UPDATE questions SET survey_id = $1, question_type = $2, question = $3 WHERE question_id = $4',
    [survey_id, question_type, question, question_id])
    return results
}

const deleteQuestionById = async(question_id) => {
    results = await db.query('DELETE FROM questions WHERE id = $1', [question_id])
    return results
}

module.exports = { 
    selectQuestionsBySurveyID, getQuestions, getQuestionById, createQuestion, updateQuestionById, deleteQuestionById
}
  
