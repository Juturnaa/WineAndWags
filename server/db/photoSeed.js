/* eslint-disable no-plusplus */
const db = require('./index');

const profilePhotos = ['https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTQyMDA0NDgwMzUzNzcyNjA2/mark-zuckerberg_gettyimages-512304736jpg.jpg', 'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5c76b7d331358e35dd2773a9%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D0%26cropX2%3D4401%26cropY1%3D0%26cropY2%3D4401'];
const dogPhotos = ['https://images.dog.ceo//breeds//cattledog-australian//IMG_3668.jpg', 'https://images.dog.ceo//breeds//cotondetulear//IMAG1063.jpg', 'https://images.dog.ceo//breeds//kuvasz//n02104029_2504.jpg', 'https://images.dog.ceo//breeds//retriever-chesapeake//n02099849_953.jpg', 'https://images.dog.ceo//breeds//boxer//n02108089_2791.jpg', 'https://images.dog.ceo//breeds//finnish-lapphund//mochilamvan.jpg', 'https://images.dog.ceo//breeds//beagle//DSC05086.JPG', 'https://images.dog.ceo//breeds//dhole//n02115913_1010.jpg', 'https://images.dog.ceo//breeds//poodle-toy//n02113624_265.jpg', 'https://images.dog.ceo//breeds//pug//DSCF7495-2.jpg'];

const seed = () => {
  function setPhotos(value) {
    const dogPhoto = dogPhotos[Math.floor(Math.random() * profilePhotos.length)];
    for (let i = 1; i <= value.length; i++) {
      console.log(i);
      if (i % 2 === 0) {
        db.query(`INSERT INTO waw.photos(user_id, dog_id, url) VALUES (${value[i - 1].owner_id}, ${value[i - 1].id}, '${dogPhoto}')`);
        db.query(`INSERT INTO waw.photos(user_id, dog_id, url) VALUES (${value[i - 1].owner_id}, ${value[i - 1].id}, '${dogPhoto}')`);
      } else {
        db.query(`INSERT INTO waw.photos(user_id, dog_id, url) VALUES (${value[i - 1].owner_id}, ${value[i - 1].id}, '${dogPhoto}')`);
      }
    }
    console.log('done');
  }

  db.query('SELECT * FROM waw.dogs ORDER BY owner_id', (err, res) => {
    if (err) console.log(err);
    else setPhotos(res.rows);
  });

  for (let i = 1; i <= 1000; i++) {
    console.log(i);
    const user_id = i;
    let dog_id = null;

    const humanPhoto = profilePhotos[Math.floor(Math.random() * profilePhotos.length)];
    db.query(`INSERT INTO waw.photos(user_id, dog_id, url) VALUES (${user_id}, ${dog_id}, '${humanPhoto}')`);
  }
};

seed();
