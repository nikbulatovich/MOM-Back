const fs = require('fs');
const db = require('../db')
const { insertSurvey } = require('./surveys');
const { createQuestion } = require('./questionnaires');
const { insertOption } = require('./options');

const insertFromJsons = () => {
  insertFromJson('surveys/epds.json');
  insertFromJson('surveys/gad7.json');
}

const insertFromJson = async (filepath) => {
  let surveyData = fs.readFileSync(filepath);
  let surveyJson = JSON.parse(surveyData);

  const surveyID = await insertSurvey(surveyJson["survey_name"], surveyJson["survey_description"], surveyJson["time"]);
  for (let i = 0; i < surveyJson["questions"].length; i++) {
    const questionJson = surveyJson["questions"][i];
    const questionID = await createQuestion(surveyID, questionJson.question);

    for (let j = 0; j < questionJson["options"].length; j++) {
      const optionJson = questionJson["options"][j];
      const optionID = await insertOption(questionID, optionJson.description, optionJson.score);
    }
  }
}

module.exports = { insertFromJsons };
