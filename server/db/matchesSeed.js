const db = require('./index.js');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomInt() {
  return Math.floor(Math.random() * (200)) + 1;
}

// ------PROFILELIKES SEED FOR USER IDS 1-200 ONLY-------- //
for (let i = 1; i <= 200; i++) {
  db.query(`INSERT INTO waw.profilelikes SELECT nextval('waw.profilelikes_id_seq'), ${i}, ${randomInt()}
  WHERE NOT EXISTS (SELECT id FROM waw.profilelikes WHERE user_id=${i} AND liked_user_id in (${randomInt()}))`);
  db.query(`INSERT INTO waw.profilelikes SELECT nextval('waw.profilelikes_id_seq'), ${i}, ${randomInt()}
  WHERE NOT EXISTS (SELECT id FROM waw.profilelikes WHERE user_id=${i} AND liked_user_id in (${randomInt()}))`);
  db.query(`INSERT INTO waw.profilelikes SELECT nextval('waw.profilelikes_id_seq'), ${i}, ${randomInt()}
  WHERE NOT EXISTS (SELECT id FROM waw.profilelikes WHERE user_id=${i} AND liked_user_id in (${randomInt()}))`);
  db.query(`INSERT INTO waw.profilelikes SELECT nextval('waw.profilelikes_id_seq'), ${i}, ${randomInt()}
  WHERE NOT EXISTS (SELECT id FROM waw.profilelikes WHERE user_id=${i} AND liked_user_id in (${randomInt()}))`);
  db.query(`INSERT INTO waw.profilelikes SELECT nextval('waw.profilelikes_id_seq'), ${i}, ${randomInt()}
  WHERE NOT EXISTS (SELECT id FROM waw.profilelikes WHERE user_id=${i} AND liked_user_id in (${randomInt()}))`);
  db.query(`INSERT INTO waw.profilelikes SELECT nextval('waw.profilelikes_id_seq'), ${i}, ${randomInt()}
  WHERE NOT EXISTS (SELECT id FROM waw.profilelikes WHERE user_id=${i} AND liked_user_id in (${randomInt()}))`);
  db.query(`INSERT INTO waw.profilelikes SELECT nextval('waw.profilelikes_id_seq'), ${i}, ${randomInt()}
  WHERE NOT EXISTS (SELECT id FROM waw.profilelikes WHERE user_id=${i} AND liked_user_id in (${randomInt()}))`);
  db.query(`INSERT INTO waw.profilelikes SELECT nextval('waw.profilelikes_id_seq'), ${i}, ${randomInt()}
  WHERE NOT EXISTS (SELECT id FROM waw.profilelikes WHERE user_id=${i} AND liked_user_id in (${randomInt()}))`);
  db.query(`INSERT INTO waw.profilelikes SELECT nextval('waw.profilelikes_id_seq'), ${i}, ${randomInt()}
  WHERE NOT EXISTS (SELECT id FROM waw.profilelikes WHERE user_id=${i} AND liked_user_id in (${randomInt()}))`);
  db.query(`INSERT INTO waw.profilelikes SELECT nextval('waw.profilelikes_id_seq'), ${i}, ${randomInt()}
  WHERE NOT EXISTS (SELECT id FROM waw.profilelikes WHERE user_id=${i} AND liked_user_id in (${randomInt()}))`);
}
