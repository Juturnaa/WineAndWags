const db = require("./index.js");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomInt() {
  return Math.floor(Math.random() * 200) + 1;
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

// -----------MATCHES FOR USER_ID 7------------ //
for (let i = 8; i <= 40; i++) {
  // USER_ID 7 LIKES:
  db.query(`INSERT INTO waw.profilelikes SELECT nextval('waw.profilelikes_id_seq'), ${7}, ${i}
  WHERE NOT EXISTS (SELECT id FROM waw.profilelikes WHERE user_id=${7} AND liked_user_id in (${i}))`);
  USERS 8-20 LIKING USER 7
  db.query(`INSERT INTO waw.profilelikes SELECT nextval('waw.profilelikes_id_seq'), ${i}, ${7}
  WHERE NOT EXISTS (SELECT id FROM waw.profilelikes WHERE user_id=${i} AND liked_user_id in (${7}))`);
  // POSTING NEW CONVOS FOR USER 7 MATCHES
  db.query(
    `INSERT INTO waw.convo SELECT nextval('waw.convo_id_seq'), ${7}, ${i} WHERE NOT EXISTS (SELECT id FROM waw.convo WHERE user1 in (${7}, ${i}) AND user2 in (${7}, ${i}))`
  );
}
// -----------MESSAGES FOR USER ID 7----------- //
for (let i = 8; i <= 12; i++) {
  // FIRST MESSAGE SENT FROM USER 7
  db.query(
    `INSERT INTO waw.message (id, sender_id, body, time_stamp, convo_id, opened) VALUES (DEFAULT, ${7}, 'hiii cute dog', DEFAULT, (select id from waw.convo where user1 in (${7}, ${i}) and user2 in (${7}, ${i})), false)`
  );
}

setTimeout(() => {
  for (let i = 8; i <= 12; i++) {
    // MESSAGE SENT TO USER 7
    db.query(
      `INSERT INTO waw.message (id, sender_id, body, time_stamp, convo_id, opened) VALUES (DEFAULT, ${i}, 'hi there thanks yours too. what do you do for fun', DEFAULT, (select id from waw.convo where user1 in (${i}, ${7}) and user2 in (${i}, ${7})), false)`
    );
  }
}, 5000);

setTimeout(() => {
  db.query(
    `INSERT INTO waw.message (id, sender_id, body, time_stamp, convo_id, opened) VALUES (DEFAULT, ${7}, 'long walks on the beach', DEFAULT, (select id from waw.convo where user1 in (${7}, ${8}) and user2 in (${7}, ${8})), false)`
  );
  db.query(
    `INSERT INTO waw.message (id, sender_id, body, time_stamp, convo_id, opened) VALUES (DEFAULT, ${7}, 'netflix and snack marathon', DEFAULT, (select id from waw.convo where user1 in (${7}, ${9}) and user2 in (${7}, ${9})), false)`
  );
  db.query(
    `INSERT INTO waw.message (id, sender_id, body, time_stamp, convo_id, opened) VALUES (DEFAULT, ${7}, 'trying cool new bars and all their signature drinks', DEFAULT, (select id from waw.convo where user1 in (${7}, ${12}) and user2 in (${7}, ${12})), false)`
  );
}, 10000);
