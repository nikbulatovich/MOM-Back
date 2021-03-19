const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} = require("../db/users");

const { getAnswersByPersonId } = require('../db/answers')

router.get("/users", async (req, res) => {
  results = await getUsers();
  res.send(results.rows);
});

router.get("/:id", async (req, res) => {
  const person_id = parseInt(req.params.id);
  const person = await getUserById(person_id);
  res.send(person);
});

router.get("/:id/answers", async (req, res)=> {
  const person_id = parseInt(req.params.id);
  const answers = await getAnswersByPersonId(person_id);
  res.send(answers.map(answer => answer.option_id));
})

router.post("/", async (req, res) => {
  const {
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
  } = req.body;
  const person = await createUser(
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
  );
  res.send(person);
});

router.put("/users/:userId", async (req, res) => {
  const person_id = parseInt(req.params.person_id);
  const {
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
  } = req.body;
  results = await updateUserById(
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
  );
  res.send(`User modified with ID: ${person_id}`);
});

router.delete("/users/:userId", async (req, res) => {
  const person_id = parseInt(req.params.person_id);
  results = await deleteUser(person_id);
  res.send(`User deleted with ID: ${person_id}`);
});

module.exports = router;
