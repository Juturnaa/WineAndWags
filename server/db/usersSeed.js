/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
const bcrypt = require('bcryptjs');
const db = require('./index.js');

const malePhotos = [
  'https://image.shutterstock.com/image-photo/portrait-smiling-red-haired-millennial-600w-1194497251.jpg',
  'https://image.shutterstock.com/image-photo/head-shot-portrait-smiling-middle-600w-1339318991.jpg',
  'https://image.shutterstock.com/image-photo/side-view-young-happy-smiling-600w-462825271.jpg',
  'https://image.shutterstock.com/image-photo/halfturned-side-profile-close-view-600w-790169857.jpg',
  'https://image.shutterstock.com/image-photo/portrait-smiling-african-american-student-600w-1194497215.jpg',
  'https://image.shutterstock.com/image-photo/african-man-portrait-silhouette-isolated-600w-432271696.jpg',
  'https://image.shutterstock.com/image-photo/portrait-young-smiling-handsome-bearded-600w-1906254982.jpg',
  'https://image.shutterstock.com/image-photo/young-handsome-man-beard-wearing-600w-1640944705.jpg',
  'https://image.shutterstock.com/image-photo/close-side-profile-photo-intelligent-600w-1447435748.jpg',
];
const femalePhotos = [
  'https://image.shutterstock.com/image-photo/close-side-portrait-healthy-young-600w-674516284.jpg',
  'https://image.shutterstock.com/image-photo/young-beautiful-brunette-woman-wearing-600w-1727105977.jpg',
  'https://image.shutterstock.com/image-photo/young-african-american-girl-wearing-600w-1893704815.jpg',
  'https://image.shutterstock.com/image-photo/woman-shirt-studio-profile-isolated-600w-520346509.jpg',
  'https://image.shutterstock.com/image-photo/close-profile-half-face-portrait-600w-1018670407.jpg',
  'https://image.shutterstock.com/image-photo/side-portrait-smiling-asian-woman-600w-1399301462.jpg',
  'https://image.shutterstock.com/image-photo/beautiful-redhead-woman-freckles-studio-600w-789036601.jpg',
  'https://image.shutterstock.com/image-photo/profile-side-view-portrait-nice-600w-1619251795.jpg',
];
const maleBios = [
  'Greetings!',
  'hello world',
  'Used to work at Jamba Juice!',
  'im all vibed up!',
  'YEEEEEHAWEWWWWW',
];
const femaleBios = [
  'I wish I was younger!',
  'AQUARIUS',
  'Love Going Outside',
  'looking for a wonderful conversation...',
  'TOTAL WINE FIEND',
];

const maleNames = ['Derek', 'Nader', 'Ronald', 'Kun', 'Marcus', 'Timothy'];
const femaleNames = ['Sarah', 'Lisa', 'Veronica', 'Latrella'];
const ages = [
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  37,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
  52,
  53,
  54,
  55,
  56,
  57,
];
1;
const zipcodes = [
  '90220',
  '90221',
  '90502',
  '90710',
  '90712',
  '90713',
  '90715',
  '90716',
  '90731',
  '90732',
  '90744',
  '90745',
  '90746',
  '90755',
  '90802',
  '90803',
  '90804',
  '90805',
  '90806',
  '90807',
  '90808',
  '90810',
  '90813',
  '90814',
  '90815',
  '90822',
  '90831',
  '90840',
  '90846',
  '90040',
  '90058',
  '90201',
  '90220',
  '90221',
  '90240',
  '90241',
  '90242',
  '90255',
  '90262',
  '90270',
  '90280',
  '90604',
  '90605',
  '90606',
  '90638',
  '90640',
  '90650',
  '90660',
  '90670',
  '90703',
  '90706',
  '90723',
  '90601',
  '90602',
  '90603',
  '90605',
  '90631',
  '91006',
  '91007',
  '91008',
  '91010',
  '91016',
  '91024',
  '91030',
  '91108',
  '91702',
  '91706',
  '91722',
  '91723',
  '91724',
  '91731',
  '91732',
  '91733',
  '91741',
  '91744',
  '91745',
  '91746',
  '91748',
  '91754',
  '91756',
  '91765',
  '91770',
  '91773',
  '91775',
  '91776',
  '91780',
  '91789',
  '91790',
  '91791',
  '91792',
  '91801',
  '91803',
  '92821',
  '92823',
];

const genders = ['M', 'F', 'All'];
// const photoGender = ['M', 'F'];
const password = 'password';
const cities = [
  'Pasadena',
  'Silver Lake',
  'Glendale',
  'Santa Monica',
  'Arcadia',
  'Temple City',
];

const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

const seedUsers = () => {
  for (let i = 1; i <= 1000; i++) {
    let name;
    let bio;

    const gender = genders[getRandom(0, genders.length)];
    if (gender === 'M') {
      name = maleNames[getRandom(0, maleNames.length)];
      bio = maleBios[getRandom(0, maleBios.length)];
      db.query(`INSERT INTO waw.photos(user_id, dog_id, url) VALUES(${i}, null, '${malePhotos[getRandom(0, malePhotos.length)]}')`);
      db.query(`INSERT INTO waw.photos(user_id, dog_id, url) VALUES(${i}, null, '${malePhotos[getRandom(0, malePhotos.length)]}')`);
      db.query(`INSERT INTO waw.photos(user_id, dog_id, url) VALUES(${i}, null, '${malePhotos[getRandom(0, malePhotos.length)]}')`);
      db.query(`INSERT INTO waw.photos(user_id, dog_id, url) VALUES(${i}, null, '${malePhotos[getRandom(0, malePhotos.length)]}')`);
    } else {
      name = femaleNames[getRandom(0, femaleNames.length)];
      bio = femaleBios[getRandom(0, femaleBios.length)];
      db.query(`INSERT INTO waw.photos(user_id, dog_id, url) VALUES(${i}, null, '${femalePhotos[getRandom(0, femalePhotos.length)]}')`);
      db.query(`INSERT INTO waw.photos(user_id, dog_id, url) VALUES(${i}, null, '${femalePhotos[getRandom(0, femalePhotos.length)]}')`);
      db.query(`INSERT INTO waw.photos(user_id, dog_id, url) VALUES(${i}, null, '${femalePhotos[getRandom(0, femalePhotos.length)]}')`);
      db.query(`INSERT INTO waw.photos(user_id, dog_id, url) VALUES(${i}, null, '${femalePhotos[getRandom(0, femalePhotos.length)]}')`);
    }
    const email = `sophiaacheong${i}@gmail.com`;
    const age = ages[getRandom(0, ages.length)];
    const zipcode = zipcodes[getRandom(0, zipcodes.length)];
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const city = cities[getRandom(0, cities.length)];
    console.log(i);
    db.query(
      'INSERT INTO waw.users(id, "name", bio, email, "password", age, zipcode, city, searched_as) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [
        `${i}`,
        `${name}`,
        `${bio}`,
        `${email}`,
        `${hash}`,
        `${age}`,
        `${zipcode}`,
        `${city}`,
        `${gender}`,
      ],
    );
  }
};

seedUsers();
