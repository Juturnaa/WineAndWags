/* eslint-disable func-names */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
const pool = require("./index");
const breed = require('../../client/src/dummyData/dogBreed');

const names = [
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

const gender = ["M", "F"];

const bio = [
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

const size = ["XS", "S", "M", "L", "XL"];

const healthy = [true, false];

function random(max) {
  return Math.floor(Math.random() * max);
}

const dogSeed = function (
  names,
  gender,
  bio,
  hypo,
  neutered,
  rating,
  size,
  breed,
  healthy
) {
  const owner_id = [];
  for (let i = 1; i <= 1000; i++) {
    owner_id.push(i);
  }

  const age = [];
  for (let i = 1; i <= 25; i++) {
    age.push(i);
  }

  for (let i = 0; i < 1000; i++) {
    console.log(i);
    const name = names[random(names.length)];
    const gen = gender[random(gender.length)];
    const bi = bio[random(bio.length)];
    const hyp = hypo[random(hypo.length)];
    const neu = neutered[random(neutered.length)];
    const rate = rating[random(rating.length)];
    const ag = age[random(age.length)];
    const si = size[random(size.length)];
    const bre = breed[random(breed.length)];
    const health = healthy[random(healthy.length)];
    if (i % 2 === 0) {
      pool.query(
        `INSERT INTO waw.dogs(name, gender, bio, hypo, neutered, rating, owner_id, age, size, breed, healthy) VALUES ('${name}', '${gen}', '${bi}', ${hyp}, ${neu}, ${rate}, ${owner_id[i]}, ${ag}, '${si}', '${bre}', ${health})`
      );
    } else {
      pool.query(
        `INSERT INTO waw.dogs(name, gender, bio, hypo, neutered, rating, owner_id, age, size, breed, healthy) VALUES ('${name}', '${gen}', '${bi}', ${hyp}, ${neu}, ${rate}, ${owner_id[i]}, ${ag}, '${si}', '${bre}', ${health})`
      );
      pool.query(
        `INSERT INTO waw.dogs(name, gender, bio, hypo, neutered, rating, owner_id, age, size, breed, healthy) VALUES ('${name}', '${gen}', '${bi}', ${hyp}, ${neu}, ${rate}, ${owner_id[i]}, ${ag}, '${si}', '${bre}', ${health})`
      );
      pool.query(
        `INSERT INTO waw.dogs(name, gender, bio, hypo, neutered, rating, owner_id, age, size, breed, healthy) VALUES ('${name}', '${gen}', '${bi}', ${hyp}, ${neu}, ${rate}, ${owner_id[i]}, ${ag}, '${si}', '${bre}', ${health})`
      );
    }
  }
};

dogSeed(names, gender, bio, hypo, neutered, rating, size, breed, healthy);
