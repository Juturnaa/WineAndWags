/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
const bcrypt = require("bcryptjs");
const db = require("./index.js");
const breed = require("../../client/src/dummyData/dogBreed");

const malePhotos = [
  "https://image.shutterstock.com/image-photo/portrait-smiling-red-haired-millennial-600w-1194497251.jpg",
  "https://image.shutterstock.com/image-photo/head-shot-portrait-smiling-middle-600w-1339318991.jpg",
  "https://image.shutterstock.com/image-photo/side-view-young-happy-smiling-600w-462825271.jpg",
  "https://image.shutterstock.com/image-photo/halfturned-side-profile-close-view-600w-790169857.jpg",
  "https://image.shutterstock.com/image-photo/portrait-smiling-african-american-student-600w-1194497215.jpg",
  "https://image.shutterstock.com/image-photo/african-man-portrait-silhouette-isolated-600w-432271696.jpg",
  "https://image.shutterstock.com/image-photo/portrait-young-smiling-handsome-bearded-600w-1906254982.jpg",
  "https://image.shutterstock.com/image-photo/young-handsome-man-beard-wearing-600w-1640944705.jpg",
  "https://image.shutterstock.com/image-photo/close-side-profile-photo-intelligent-600w-1447435748.jpg",
];
const femalePhotos = [
  "https://image.shutterstock.com/image-photo/close-side-portrait-healthy-young-600w-674516284.jpg",
  "https://image.shutterstock.com/image-photo/young-beautiful-brunette-woman-wearing-600w-1727105977.jpg",
  "https://image.shutterstock.com/image-photo/young-african-american-girl-wearing-600w-1893704815.jpg",
  "https://image.shutterstock.com/image-photo/woman-shirt-studio-profile-isolated-600w-520346509.jpg",
  "https://image.shutterstock.com/image-photo/close-profile-half-face-portrait-600w-1018670407.jpg",
  "https://image.shutterstock.com/image-photo/side-portrait-smiling-asian-woman-600w-1399301462.jpg",
  "https://image.shutterstock.com/image-photo/beautiful-redhead-woman-freckles-studio-600w-789036601.jpg",
  "https://image.shutterstock.com/image-photo/profile-side-view-portrait-nice-600w-1619251795.jpg",
];
const maleBios = [
  "Greetings!",
  "hello world",
  "Used to work at Jamba Juice!",
  "im all vibed up!",
  "YEEEEEHAWEWWWWW",
];
const femaleBios = [
  "I wish I was younger!",
  "AQUARIUS",
  "Love Going Outside",
  "looking for a wonderful conversation...",
  "TOTAL WINE FIEND",
];

const dogPhotos = [
  "https://images.dog.ceo//breeds//terrier-russell//little1.jpg",
  "https://images.dog.ceo//breeds//cattledog-australian//IMG_3668.jpg",
  "https://images.dog.ceo//breeds//cotondetulear//IMAG1063.jpg",
  "https://images.dog.ceo//breeds//kuvasz//n02104029_2504.jpg",
  "https://images.dog.ceo//breeds//retriever-chesapeake//n02099849_953.jpg",
  "https://images.dog.ceo//breeds//boxer//n02108089_2791.jpg",
  "https://images.dog.ceo//breeds//finnish-lapphund//mochilamvan.jpg",
  "https://images.dog.ceo//breeds//beagle//DSC05086.JPG",
  "https://images.dog.ceo//breeds//dhole//n02115913_1010.jpg",
  "https://images.dog.ceo//breeds//poodle-toy//n02113624_265.jpg",
  "https://images.dog.ceo//breeds//pug//DSCF7495-2.jpg",
];

const dogNames = [
  "Charlie",
  "Goofie",
  "Takito",
  "Mochi",
  "Rocky",
  "Wolfie",
  "Alpha",
  "Kun",
  "Michael",
  "Jake",
  "Hyungjoo",
  "Cloud",
  "Chloe",
  "Ruby",
  "Shake",
  "Oliver",
  "Pierre",
  "Revan",
  "Charlie",
  "Goofie",
  "Taquito",
  "Takito",
  "Mochi",
  "Rocky",
  "Wolfie",
  "Alpha",
  "Kun",
  "Michael",
  "Jake",
  "Hyungjoo",
  "Cloud",
  "Chloe",
  "Ruby",
  "Shake",
  "Oliver",
  "Pierre",
  "Revan",
];

const dogGenders = ["M", "F"];

const dogBios = [
  "I love to play fetch",
  "I run around the house and I like to play with my hooman",
  "The park is my favorite place to go",
  "I nap 24/7",
  "Beef is my favorite meat, along with a side of veggies",
  "Hiking is my favorite thing to do with my hoodman every Sunday morning",
];

const hypo = [true, false];

const neutered = [true, false];

const rating = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const dogAges = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
];

const dogSizes = ["XS", "S", "M", "L", "XL"];

const healthy = [true, false];

const maleNames = ["Derek", "Nader", "Ronald", "Kun", "Marcus", "Timothy"];
const femaleNames = ["Sarah", "Lisa", "Veronica", "Latrella"];
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
  "90220",
  "90221",
  "90502",
  "90710",
  "90712",
  "90713",
  "90715",
  "90716",
  "90731",
  "90732",
  "90744",
  "90745",
  "90746",
  "90755",
  "90802",
  "90803",
  "90804",
  "90805",
  "90806",
  "90807",
  "90808",
  "90810",
  "90813",
  "90814",
  "90815",
  "90822",
  "90831",
  "90840",
  "90846",
  "90040",
  "90058",
  "90201",
  "90220",
  "90221",
  "90240",
  "90241",
  "90242",
  "90255",
  "90262",
  "90270",
  "90280",
  "90604",
  "90605",
  "90606",
  "90638",
  "90640",
  "90650",
  "90660",
  "90670",
  "90703",
  "90706",
  "90723",
  "90601",
  "90602",
  "90603",
  "90605",
  "90631",
  "91006",
  "91007",
  "91008",
  "91010",
  "91016",
  "91024",
  "91030",
  "91108",
  "91702",
  "91706",
  "91722",
  "91723",
  "91724",
  "91731",
  "91732",
  "91733",
  "91741",
  "91744",
  "91745",
  "91746",
  "91748",
  "91754",
  "91756",
  "91765",
  "91770",
  "91773",
  "91775",
  "91776",
  "91780",
  "91789",
  "91790",
  "91791",
  "91792",
  "91801",
  "91803",
  "92821",
  "92823",
];

const genders = ["M", "F", "All"];
const photoGender = ["M", "F"];
const password = "password";
const cities = [
  "Pasadena",
  "Silver Lake",
  "Glendale",
  "Santa Monica",
  "Arcadia",
  "Temple City",
];

const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

const seedUsers = () => {
  for (let i = 1; i <= 1000; i++) {
    let name = maleNames[getRandom(0, maleNames.length)];
    let bio = femaleBios[getRandom(0, maleBios.length)];
    let photo;

    const gender = photoGender[getRandom(0, genders.length)];
    if (gender === "M" || "All") {
      name = maleNames[getRandom(0, maleNames.length)];
      bio = maleBios[getRandom(0, maleBios.length)];
    } else {
      name = femaleNames[getRandom(0, femaleNames.length)];
      bio = femaleBios[getRandom(0, maleBios.length)];
    }
    const email = `sophiaacheong${i}@gmail.com`;
    const age = ages[getRandom(0, ages.length)];
    const zipcode = zipcodes[getRandom(0, zipcodes.length)];
    const searched_as = genders[getRandom(0, genders.length)];
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
        `${searched_as}`,
      ],
      (err, res) => console.log("done!")
    );

    for (let k = 1; k < 2; k++) {
      if (gender === "M" || "All") {
        photo = malePhotos[getRandom(0, malePhotos.length)];
      } else {
        photo = femalePhotos[getRandom(0, femalePhotos.length)];
      }
      db.query(
        `INSERT INTO waw.photos(user_id, dog_id, url) VALUES (${i}, ${null}, '${photo}')`
      );
    }
  }
};

const seedDogs = () => {
  let dogId = 1;

  for (let i = 1; i <= 1000; i++) {
    let dogAmount = getRandom(0, 3);

    for (let j = 0; j < dogAmount; j++) {
      const dogName = dogNames[getRandom(0, dogNames.length)];
      const dogGender = dogGenders[getRandom(0, dogGenders.length)];
      const dogBio = dogBios[getRandom(0, dogBios.length)];
      const hypoOptions = Math.random() < 0.5;
      const neuteredOptions = Math.random() < 0.5;
      const ratingOptions = rating[getRandom(0, rating.length)];
      const owner_id = i + 1;
      const dogAge = dogAges[getRandom(0, dogAges.length)] + 1;
      const size = dogSizes[getRandom(0, dogSizes.length)];
      const breeds = breed[getRandom(0, breed.length)];
      const healthy = Math.random() < 0.5;
      db.query(
        "INSERT INTO waw.dogs(id, name, gender, bio, hypo, neutered, rating, owner_id, age, size, breed, healthy) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
        [
          `${dogId}`,
          `${dogName}`,
          `${dogGender}`,
          `${dogBio}`,
          `${hypoOptions}`,
          `${neuteredOptions}`,
          `${ratingOptions}`,
          `${owner_id}`,
          `${dogAge}`,
          `${size}`,
          `${breeds}`,
          `${healthy}`,
        ],
        (err, res) => console.log("done!")
      );

      for (let k = 1; k <= dogAmount; k++) {
        let photo = dogPhotos[getRandom(0, dogPhotos.length)];
        db.query(
          `INSERT INTO waw.photos(user_id, dog_id, url) VALUES (${i}, ${dogId}, '${photo}')`
        );
      }
      dogId++;
    }
    dogId++;
  }
};
seedUsers();

seedDogs();
