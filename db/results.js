const db = require('../db')

const getResults = async () => {
  let results = await db.query("SELECT * FROM results")
  return results
}

module.exports = { 
  getResults
}
