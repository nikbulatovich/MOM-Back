const db = require('../db')
const { selectQuestionsBySurveyID } = require('./questionnaires');

const insertSurvey = async(survey_name, survey_description, time) => {
    results = await db.query('INSERT INTO survey (survey_name, survey_description, time) VALUES ($1, $2, $3) RETURNING *',
    [survey_name, survey_description, time])
    return results.rows[0].survey_id;
}

const selectSurveys = async () => {
    results = await db.query('SELECT * FROM survey');
    const surveys = results.rows;
    for (let i = 0; i < surveys.length; i++){
        surveys[i].questions = await selectQuestionsBySurveyID(surveys[i].survey_id);
    }
    return surveys;
}

module.exports = { insertSurvey, selectSurveys };
