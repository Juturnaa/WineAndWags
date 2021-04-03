const db = require('./index.js');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomInt() {
  return Math.floor(Math.random() * (1000)) + 1;
}
for (let i = 1; i <= 1000; i++) {
  db.query(`INSERT INTO waw.photolikes(user_id, photo_id) VALUES (${randomInt()}, ${randomInt()})`);
}
