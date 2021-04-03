// seed photos table
const axios = require('axios');
const db = require('./server/db/index')
const profilePhotos = ['https://ca.slack-edge.com/T2SV1LBC6-U01K1S48C2Z-g2ea6c546d81-512', 'https://secure.gravatar.com/avatar/e3b51ca72dee4ef87916ae2b9240df50.jpg?s=512&d=https%3A%2F%2Fdev.slack.com%2Fimg%2Favatars%2Fava_0010-512.v1443724322.png']

const seed = async => {
  console.log('seeding')
  for (let i = 1; i < 2000; i++) {
    console.log(i);
    let user_id = i;
    let dog_id = null;
    let isDog = Math.random() < 0.5 ? true : false; // randomize whether this is a dog or human photo
    if (!isDog) {
      let photo = profilePhotos[Math.floor(Math.random() * profilePhotos.length)];
      db.query(`INSERT INTO TABLE NAME VALUES (${user_id}, ${dog_id}, ${photo})`)
    }
    if (isDog) {
      dog_id = Math.floor(Math.random() * 2000) + 1 + i // random id for dog 1-10k
      // dog photo get request
      await axios({
        method: 'get',
        url: 'https://dog.ceo/api/breeds/image/random' // random dog api
      })
        .then((response) => {
          db.query(`INSERT INTO TABLE NAME VALUES (${user_id}, ${dog_id}, ${response.data.message})`)
        })
    }
  }
  console.log('seeded')
}

seed();
