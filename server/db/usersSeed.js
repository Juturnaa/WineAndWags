const db = require("./index.js");
const bcrypt = require("bcryptjs");

let names = [
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
let ages = [
  44,
  34,
  42,
  55,
  23,
  41,
  65,
  22,
  20,
  21,
  23,
  43,
  12,
  54,
  32,
  19,
  25,
  56,
];
let zipcodes = [
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
let genders = ["m", "f", "nb"];
let bios = ["hey my name is triko.", "YEEEEEHAWEWWWWW", "im all vibed up!"];
let password = "password";

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const seedUsers = () => {
  for (let i = 0; i < 1000; i++) {
    let name = names[getRandom(0, names.length - 1)];
    let gender = genders[getRandom(0, genders.length - 1)];
    let bio = bios[getRandom(0, bios.length - 1)];
    let email = `sophiaacheong${i}@gmail.com`;
    let age = ages[getRandom(0, ages.length - 1)];
    let zipcode = zipcodes[getRandom(0, zipcodes.length - 1)];
    let searched_as = genders[getRandom(0, genders.length - 1)];
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    db.query(
      `INSERT INTO waw.users("name", gender, bio, email, "password", age, zipcode, searched_as) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        `${name}`,
        `${gender}`,
        `${bio}`,
        `${email}`,
        `${hash}`,
        `${age}`,
        `${zipcode}`,
        `${searched_as}`,
      ]
    );
  }
};

seedUsers();
