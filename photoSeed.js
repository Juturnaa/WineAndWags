// seed photos table
const axios = require('axios');
const db = require('./server/db/index')
const profilePhotos = ['https://ca.slack-edge.com/T2SV1LBC6-U01K1S48C2Z-g2ea6c546d81-512', 'https://secure.gravatar.com/avatar/e3b51ca72dee4ef87916ae2b9240df50.jpg?s=512&d=https%3A%2F%2Fdev.slack.com%2Fimg%2Favatars%2Fava_0010-512.v1443724322.png']

for (let i = 1; i < 100; i++) {
  let user_id = i;
  let dog_id = null;
  let isDog = Math.random() < 0.5 ? true : false; // randomize whether this is a dog or human photo
  if (!isDog) {
    let entry = {
      user_id,
      dog_id,
      url: profilePhotos[Math.floor(Math.random() * profilePhotos.length)]
    }
    // save entry to db
    console.log(entry) // db.query(INSERT INTO TABLE NAME VALUES (user_id, dog_id, response.data.message))
  }
  if (isDog) {
    dog_id = Math.floor(Math.random() * 100) + 1 + i // random id for dog 1-10k
    // dog photo get request
    axios({
      method: 'get',
      url: 'https://dog.ceo/api/breeds/image/random' // random dog api
    })
      .then((response) => {
        let entry = {
          user_id,
          dog_id,
          url: response.data.message
        }
        // save entry to db
        console.log(entry) // db.query(INSERT INTO TABLE NAME VALUES (user_id, dog_id, response.data.message))
      })
  }



}
