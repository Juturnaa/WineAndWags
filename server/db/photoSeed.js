/* eslint-disable no-plusplus */
const db = require('./index');

const dogPhotos = ['https://images.dog.ceo//breeds//cattledog-australian//IMG_3668.jpg', 'https://images.dog.ceo//breeds//cotondetulear//IMAG1063.jpg', 'https://images.dog.ceo//breeds//kuvasz//n02104029_2504.jpg', 'https://images.dog.ceo//breeds//retriever-chesapeake//n02099849_953.jpg', 'https://images.dog.ceo//breeds//boxer//n02108089_2791.jpg', 'https://images.dog.ceo//breeds//finnish-lapphund//mochilamvan.jpg', 'https://images.dog.ceo//breeds//beagle//DSC05086.JPG', 'https://images.dog.ceo//breeds//dhole//n02115913_1010.jpg', 'https://images.dog.ceo//breeds//poodle-toy//n02113624_265.jpg', 'https://images.dog.ceo//breeds//pug//DSCF7495-2.jpg'];

const seed = () => {
  function setPhotos(value) {
    for (let i = 1; i <= value.length; i++) {
      console.log(i);
      if (i % 2 === 0) {
        db.query(`INSERT INTO waw.photos(user_id, dog_id, url) VALUES (${value[i - 1].owner_id}, ${value[i - 1].id}, '${dogPhotos[Math.floor(Math.random() * dogPhotos.length)]}')`);
        db.query(`INSERT INTO waw.photos(user_id, dog_id, url) VALUES (${value[i - 1].owner_id}, ${value[i - 1].id}, '${dogPhotos[Math.floor(Math.random() * dogPhotos.length)]}')`);
      } else {
        db.query(`INSERT INTO waw.photos(user_id, dog_id, url) VALUES (${value[i - 1].owner_id}, ${value[i - 1].id}, '${dogPhotos[Math.floor(Math.random() * dogPhotos.length)]}')`);
        db.query(`INSERT INTO waw.photos(user_id, dog_id, url) VALUES (${value[i - 1].owner_id}, ${value[i - 1].id}, '${dogPhotos[Math.floor(Math.random() * dogPhotos.length)]}')`);
        db.query(`INSERT INTO waw.photos(user_id, dog_id, url) VALUES (${value[i - 1].owner_id}, ${value[i - 1].id}, '${dogPhotos[Math.floor(Math.random() * dogPhotos.length)]}')`);
      }
    }
    console.log('done');
  }

  db.query('SELECT * FROM waw.dogs ORDER BY owner_id', (err, res) => {
    if (err) console.log(err);
    else setPhotos(res.rows);
  });
};

seed();
