const db = require("./index.js");
const breeds = require('../../client/src/dummyData/dogBreed');

const min_sizes = ['XS', 'S', 'M'];
const max_sizes = ['L', 'XL'];
const dog_min_ages = [0,1,2,3,4,5,6,7,8,9];
const dog_max_ages = [10,11,12,13,14,15,16,17,18,19,20];
const dog_genders = ['M', 'F', 'Both'];
const hypos = [true, false];
const neutereds = [true, false];
const health_issuess = [true, false];
const max_dists =[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
const genders = ["M", "F", "All"];
const min_ages = [18,19,20,21,22,23,24,25];
const max_ages = [25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40];

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };
const seedFilters = () => {
    for (let i = 1; i <= 1000; i++) {
      const min_size = min_sizes[getRandom(0, min_sizes.length)];
      const max_size = max_sizes[getRandom(0, max_sizes.length)];
      const dog_min_age = dog_min_ages[getRandom(0, dog_min_ages.length)];
      const dog_max_age = dog_max_ages[getRandom(0, dog_max_ages.length)];
      const dog_gender = dog_genders[getRandom(0, dog_genders.length)];
      const hypo = hypos[getRandom(0, hypos.length)];
      const neutered = neutereds[getRandom(0, neutereds.length)];
      const health_issues = health_issuess[getRandom(0, health_issuess.length)];
      const max_dist = max_dists[getRandom(0, max_dists.length)];
      const gender = genders[getRandom(0, genders.length)];
      const min_age = min_ages[getRandom(0, min_ages.length)];
      const max_age = max_ages[getRandom(0, max_ages.length)];
      console.log(i)
      if(i <= 499) {
        
        const avoid_breeds = `${breeds[getRandom(0, breeds.length)]},${breeds[getRandom(0, breeds.length)]}`;
        db.query(
        `INSERT INTO waw.filters(user_id, min_size, max_size, dog_min_age, dog_max_age, dog_genders, hypo, neutered, health_issues, avoid_breeds, max_dist, genders, min_age, max_age) VALUES(${i}, '${min_size}', '${max_size}', ${dog_min_age}, ${dog_max_age}, '${dog_gender}', ${hypo}, ${neutered}, ${health_issues}, '${avoid_breeds}', ${max_dist}, '${gender}', ${min_age}, ${max_age})`
        );

      } else {
        const favorite_breeds = `${breeds[getRandom(0, breeds.length)]},${breeds[getRandom(0, breeds.length)]}`;
        db.query(
        `INSERT INTO waw.filters(user_id, min_size, max_size, dog_min_age, dog_max_age, dog_genders, hypo, neutered, health_issues, favorite_breeds, max_dist, genders, min_age, max_age) VALUES(${i}, '${min_size}', '${max_size}', ${dog_min_age}, ${dog_max_age}, '${dog_gender}', ${hypo}, ${neutered}, ${health_issues}, '${favorite_breeds}', ${max_dist}, '${gender}', ${min_age}, ${max_age})`
        );
    }
  }
};

  seedFilters();
