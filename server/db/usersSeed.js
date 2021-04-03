const db = require("./index.js");

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
let age = [
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
let email = "sophiaacheong@gmail.com";
let zipcode = ["91001", "92833", "90024", "91354"];
let gender = ["m", "f", "nb"];
let bio = ["hey my name is triko.", "YEEEEEHAWEWWWWW", "im all vibed up!"];
let password = "password";

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};

const seedUsers = () => {};
