const db = require('./index');
const types= ["photoLike", "message"];
const nums = [1, 1, 2, 2];
const names = [
  "Aaberg",
  "Aalst",
  "Aara",
  "Aaren",
  "Aarika",
  "Aaron",
  "Aaronson",
  "Ab",
  "Aba",
  "Abad",
  "Abagael",
  "Abagail",
  "Abana",
  "Abate",
  "Abba",
  "Abbate",
  "Abbe",
  "Abbey",
];

const seed = () => {
  for (let i = 1; i <= 998; i++) {
    console.log(i);
    const sender_id = i;
    const type_id = i;
    nums.forEach(() =>{
        let type = types[Math.floor(Math.random() * types.length)];
        let recipient_id = i + nums[Math.floor(Math.random() * nums.length)];
        let sender_name = names[Math.floor(Math.random() * names.length)];
        db.query(`INSERT INTO waw.notifications("type", type_id, sender_id, sender_name, recipient_id) VALUES ('${type}', ${type_id}, ${sender_id}, '${sender_name}', ${recipient_id})`);
    })
  }
};

seed();
