const db = require('./index');

const profilePhotos = ['https://ca.slack-edge.com/T2SV1LBC6-U01K1S48C2Z-g2ea6c546d81-512', 'https://secure.gravatar.com/avatar/e3b51ca72dee4ef87916ae2b9240df50.jpg?s=512&d=https%3A%2F%2Fdev.slack.com%2Fimg%2Favatars%2Fava_0010-512.v1443724322.png'];
const dogPhotos = ['https://images.dog.ceo//breeds//cattledog-australian//IMG_3668.jpg', 'https://images.dog.ceo//breeds//cotondetulear//IMAG1063.jpg', 'https://images.dog.ceo//breeds//kuvasz//n02104029_2504.jpg', 'https://images.dog.ceo//breeds//retriever-chesapeake//n02099849_953.jpg', 'https://images.dog.ceo//breeds//boxer//n02108089_2791.jpg', 'https://images.dog.ceo//breeds//finnish-lapphund//mochilamvan.jpg', 'https://images.dog.ceo//breeds//beagle//DSC05086.JPG', 'https://images.dog.ceo//breeds//dhole//n02115913_1010.jpg', 'https://images.dog.ceo//breeds//poodle-toy//n02113624_265.jpg', 'https://images.dog.ceo//breeds//pug//DSCF7495-2.jpg'];

const seed = () => {
  for (let i = 1; i <= 2000; i++) {
    console.log(i);
    const user_id = i;
    let dog_id = null;
    const isDog = Math.random() < 0.5; // randomize whether this is a dog or human photo
    if (!isDog) {
      const photo = profilePhotos[Math.floor(Math.random() * profilePhotos.length)];
      db.query(`INSERT INTO waw.photos(user_id, dog_id, url) VALUES (${user_id}, ${dog_id}, '${photo}')`);
    }
    if (isDog) {
      dog_id = Math.floor(Math.random() * 2000) + 1 + i; // random id for dog 1-2k
      const photo = dogPhotos[Math.floor(Math.random() * profilePhotos.length)];
      db.query(`INSERT INTO waw.photos(user_id, dog_id, url) VALUES (${user_id}, ${dog_id}, '${photo}')`);
    }
  }
};

seed();
