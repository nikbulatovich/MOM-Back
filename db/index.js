const DEFAULT_PGDATABASE = 'momsovermatter';
const DEFAULT_PGUSER = 'mom-application';
const DEFAULT_PGCACERT = '/var/mom/backend/db/ca-certificate.crt';

const config = {
  host: process.env.PGHOST,
  database: process.env.PGDATABASE || DEFAULT_PGDATABASE,
  user: process.env.PGUSER || DEFAULT_PGUSER,
  password: process.env.PGPASSWORD,
  // this object will be passed to the TLSSocket constructor
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync(process.env.PGCACERT || DEFAULT_PGCACERT).toString(),
  },
}

const { Pool } = require('pg')
const pool = new Pool(config)

const createTables = () => {
  pool.query(`

    CREATE TABLE person (
      person_id SERIAL PRIMARY KEY,
      firstname VARCHAR(50),
      email VARCHAR(50) UNIQUE,
      age INT,
      postpartum_period BOOLEAN,
      first_child BOOLEAN,
      province VARCHAR(50),
      ethnicity VARCHAR(50),
      marital_status VARCHAR(50),
      education VARCHAR(200),
      therapy_type text,
      site_found VARCHAR(50)
    );

    CREATE TABLE survey (
      survey_id SERIAL PRIMARY KEY,
      survey_name VARCHAR(100) NOT NULL,
      survey_description text,
      time int
    );

    CREATE TABLE question (
      question_id SERIAL PRIMARY KEY,
      survey_id INT,
      question text NOT NULL,
      FOREIGN KEY(survey_id) REFERENCES survey(survey_id)
    );

    CREATE TABLE option (
      option_id SERIAL PRIMARY KEY,
      question_ID INT references question(question_id),
      description text,
      score int
    );
  
    CREATE TABLE answer (
      answer_id SERIAL PRIMARY KEY,
      option_id INT,
      person_id INT,
      FOREIGN KEY(option_id) REFERENCES option(option_id),
      FOREIGN KEY(person_id) REFERENCES person(person_id)
    );

  `)
}

const insertTestData = () => {
  pool.query(`

    INSERT INTO person(firstname, email, age, postpartum_period, first_child, province, ethnicity, marital_status, education, therapy_type, site_found) values('Rupinder Nagra', 'rupindernagra@gmail.com', 19, true, false, 'Ontario', 'South Asian', 'Divorced', 'University', 'N/A', 'Instagram');
    INSERT INTO person(firstname, email) values('Tailai Wang', 'tailaiwang@gmail.com');

    INSERT INTO survey(survey_name, survey_description, time) values('Survey 1', 'This is a description', 10);
    INSERT INTO survey(survey_name, survey_description, time) values('Survey 2', 'This is a description', 5);

    INSERT INTO question(survey_id, question) values(1, 'This is a question.');
    INSERT INTO question(survey_id, question) values(1, 'This is also a question.');

    INSERT INTO answer(question_id, answer, score) values(1, 'This is an answer.', 3);
    INSERT INTO answer(question_id, answer, score) values(2, 'This is also an answer.', 4);

  `)
}

const insertData = () => {
  pool.query(`

    INSERT INTO survey(survey_name, survey_description, time) values('EPDS', 'Are you experiencing mood swings, crying spells, difficulty sleeping, difficultybonding with your baby, or overwhelming fatigue? Complete this questionnaire to learn more about the symptoms and treatments for postpartum depression.', 5);

    INSERT INTO question(survey_id, question) values(1, 'I have been able to laugh and see the funny side of things');
    INSERT INTO question(survey_id, question) values(1, 'I have looked forward with enjoyment to things');
    INSERT INTO question(survey_id, question) values(1, 'I have blamed myself unnecessarily when things went wrong');
    INSERT INTO question(survey_id, question) values(1, 'I have been anxious or worried for no good reason');
    INSERT INTO question(survey_id, question) values(1, 'I have felt scared or panicky for no very good reason');
    INSERT INTO question(survey_id, question) values(1, 'Things have been getting on top of me');
    INSERT INTO question(survey_id, question) values(1, 'I have been so unhappy that I have had difficulty sleeping');
    INSERT INTO question(survey_id, question) values(1, 'I have felt sad or miserable');
    INSERT INTO question(survey_id, question) values(1, 'I have been so unhappy that I have been crying');
    INSERT INTO question(survey_id, question) values(1, 'The thought of harming myself has occurred to me');

    INSERT INTO survey(survey_name, survey_description, time) values('GAD-7', 'Are you experiencing increased levels of worry, irritability, impatience, restlessness, or agitation? Complete this questionnaire to learn more about the symptoms and treatments for postpartum anxiety.', 3);

    INSERT INTO question(survey_id, question) values(2, 'Feeling nervous, anxious, or on edge');
    INSERT INTO question(survey_id, question) values(2, 'Not being able to stop or control worrying');
    INSERT INTO question(survey_id, question) values(2, 'Worrying too much about different things');
    INSERT INTO question(survey_id, question) values(2, 'Trouble relaxing');
    INSERT INTO question(survey_id, question) values(2, 'Being so restless that it is hard to sit still');
    INSERT INTO question(survey_id, question) values(2, 'Becoming easily annoyed or irritable');
    INSERT INTO question(survey_id, question) values(2, 'Feeling afraid as if something awful might happen');

  `)
}

const cleanData = () => {
  pool.query(`

    DROP TABLE IF EXISTS answer CASCADE;
    DROP TABLE IF EXISTS question CASCADE;
    DROP TABLE IF EXISTS option CASCADE;
    DROP TABLE IF EXISTS survey CASCADE;
    DROP TABLE IF EXISTS person CASCADE;

  `)
}


const query = (text, params) => {
  return pool.query(text, params)
}

module.exports = {
  createTables,
  insertTestData,
  insertData,
  cleanData,
  query
}
