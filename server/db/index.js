const { Pool } = require("pg"),
  config = require("../../config/dbConfig.js"),
  pool = new Pool(config);

pool.connect((err) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  } else {
    return console.log("connected to psql");
  }
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
