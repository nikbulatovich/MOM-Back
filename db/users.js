const db = require("../db");

const getUsers = async () => {
  results = await db.query("SELECT * FROM people ORDER BY person_id ASC");
  return results;
};

const getUserById = async (person_id) => {
  results = await db.query("SELECT * FROM person WHERE person_id = $1", [
    person_id,
  ]);
  if ( results.rows.length > 0 ) return results.rows[0];
  return null
};

const createUser = async (
  firstname,
  email,
  age,
  postpartum_period,
  first_child,
  province,
  ethnicity,
  marital_status,
  education,
  therapy_type,
  site_found
) => {
  const results = await db.query(
    `
      INSERT INTO person (firstname, email, age, postpartum_period, first_child, province, ethnicity, marital_status, education,therapy_type, site_found) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `,
    [
      firstname,
      email,
      age,
      postpartum_period,
      first_child,
      province,
      ethnicity,
      marital_status,
      education,
      therapy_type,
      site_found,
    ]
  );
  return results.rows[0];
};

const updateUserById = async (
  firstname,
  email,
  age,
  postpartum_period,
  first_child,
  province,
  ethnicity,
  marital_status,
  education,
  therapy_type,
  site_found
) => {
  results = await db.query(
    "UPDATE people SET firstname = $1, email = $2, age = $3, postpartum_period = $4, first_child = $5, province = $6 , ethnicity = $7, marital_status = $8, education = $9, therapy_type = $10, site_found = $11 WHERE person_id = $12",
    [
      firstname,
      email,
      age,
      postpartum_period,
      first_child,
      province,
      ethnicity,
      marital_status,
      education,
      therapy_type,
      site_found,
      person_id,
    ]
  );
  return results;
};

const deleteUserById = async (person_id) => {
  results = await db.query("DELETE FROM people WHERE id = $1", [person_id]);
  return results;
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
