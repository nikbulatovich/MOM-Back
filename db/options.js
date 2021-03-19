const db = require('../db')

const insertOption = async(questionID, description, score) => {
    results = await db.query('INSERT INTO option (question_id, description, score) VALUES ($1, $2, $3) RETURNING *',
    [questionID, description, score])
    return results.rows[0].option_id;
}

const selectOptionsByQuestionID = async (questionID) => {
    results = await db.query('SELECT * FROM option WHERE question_id = $1', [questionID]);
    return results.rows;
}

module.exports = { insertOption, selectOptionsByQuestionID };
