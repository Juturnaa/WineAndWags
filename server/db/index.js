const { Pool } = require('pg');
const config = require('../../config/dbConfig.js');

const pool = new Pool(config);

pool.connect((err) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  return console.log('connected to psql');
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
