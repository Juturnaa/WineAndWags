/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
const db = require('./index.js');

// get my profile
// get my photos
// get my dogs

// get random profile
// get random profile photos
// get random profile's dogs

const dbHelpers = {
  // PROFILE ------------------------------------//
  getMyProfile: (req, res) => {
    const { id } = req.params;
    const qryStr = `SELECT waw.users.*, json_agg(jsonb_build_object('id', waw.dogs.id,
    'name', waw.dogs.name, 'gender', waw.dogs.gender,
     'bio', waw.dogs.bio, 'hypo', waw.dogs.hypo, 'neutered',
    waw. dogs.neutered, 'rating', waw.dogs.rating, 'age',
     waw.dogs.age, 'size', waw.dogs.size, 'breed', waw.dogs.breed,
     'healthy', dogs.healthy
    )) dogs_info FROM waw.users
    LEFT JOIN waw.dogs ON waw.dogs.owner_id = waw.users.id
    WHERE waw.users.id = ${id} GROUP BY waw.users.id`;
    db.query(qryStr, (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send('something went wrong with your query');
      } else {
        res.send(data.rows[0]);
      }
    });
  },
  verifyEmail: (req, res) => {
    const { email } = req.params;
    const qryStr = `SELECT * FROM waw.users WHERE email='${email}'`;
    db.query(qryStr, (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send('something went wrong with your query');
      } else {
        res.send(data.rows[0]);
      }
    });
  },
  getRandomProfile: (req, res) => {
    const {
      sizeRange,
      dogGenders,
      dogAgeRange,
      hypoallergenic,
      neutered,
      healthIssues,
      avoidBreeds,
      maxDistance,
      ownerAgeRange,
      ownerGenders,
    } = JSON.parse(req.query.filters);
    let qryStr;
    if (dogGenders === 'Both') {
      qryStr = `SELECT waw.users.*, json_agg(jsonb_build_object('id', waw.dogs.id,
      'name', waw.dogs.name, 'gender', waw.dogs.gender,
      'bio', waw.dogs.bio, 'hypo', waw.dogs.hypo, 'neutered',
      waw.dogs.neutered, 'rating', waw.dogs.rating, 'age',
      waw.dogs.age, 'size', waw.dogs.size, 'breed', waw.dogs.breed,
      'healthy', dogs.healthy
      )) dogs_info FROM waw.users
      LEFT JOIN waw.dogs ON waw.dogs.owner_id = waw.users.id
      WHERE waw.users.age BETWEEN ${ownerAgeRange[0]} AND ${ownerAgeRange[1]}
      AND waw.users.searched_as = '${ownerGenders}'
      AND waw.dogs.age BETWEEN ${dogAgeRange[0]} AND ${dogAgeRange[1]}
      AND waw.dogs.size IN (${sizeRange})
      AND waw.dogs.hypo = ${hypoallergenic}
      AND waw.dogs.neutered = ${neutered}
      AND waw.dogs.healthy = ${healthIssues}
      AND waw.dogs.breed NOT IN ('${avoidBreeds}')
      GROUP BY waw.users.id`;
    } else {
      qryStr = `SELECT waw.users.*, json_agg(jsonb_build_object('id', waw.dogs.id,
      'name', waw.dogs.name, 'gender', waw.dogs.gender,
      'bio', waw.dogs.bio, 'hypo', waw.dogs.hypo, 'neutered',
      waw.dogs.neutered, 'rating', waw.dogs.rating, 'age',
      waw.dogs.age, 'size', waw.dogs.size, 'breed', waw.dogs.breed,
      'healthy', dogs.healthy
      )) dogs_info FROM waw.users
      LEFT JOIN waw.dogs ON waw.dogs.owner_id = waw.users.id
      WHERE waw.users.age BETWEEN ${ownerAgeRange[0]} AND ${ownerAgeRange[1]}
      AND waw.users.searched_as = '${ownerGenders}'
      AND waw.dogs.age BETWEEN ${dogAgeRange[0]} AND ${dogAgeRange[1]}
      AND waw.dogs.size IN (${sizeRange})
      AND waw.dogs.hypo = ${hypoallergenic}
      AND waw.dogs.neutered = ${neutered}
      AND waw.dogs.healthy = ${healthIssues}
      AND waw.dogs.breed NOT IN ('${avoidBreeds}')
      AND waw.dogs.gender = '${dogGenders}'
      GROUP BY waw.users.id`;
    }
    db.query(qryStr, (err, data) => {
      if (err) {
        res.status(400).send('something went wrong with your query');
      } else {
        res.status(200).send(data.rows);
      }
    });
  },
  getPhotos: (req, callback) => {
    db.query(
      `SELECT * FROM waw.photos WHERE waw.photos.user_id=${req.params.id}`,
      (err, results) => {
        callback(err, results);
      },
    );
  },
  editOwnerProfile: (req, callback) => {
    const {
      name,
      gender,
      bio,
      email,
      password,
      age,
      zipcode,
      searched_as,
    } = req.body;
    const qryStr = `UPDATE waw.users SET name='${name}', gender='${gender}', bio='${bio}', email='${email}', password='${password}', age=${age}, zipcode='${zipcode}', searched_as='${searched_as}' WHERE email='${req.params.email}'`;
    db.query(qryStr, (err, results) => callback(err, results));
  },
  editDogProfile: (req, callback) => {
    const {
      name,
      gender,
      bio,
      hypo,
      neutered,
      rating,
      age,
      size,
      breed,
      healthy,
    } = req.body;
    const qryStr = `UPDATE waw.dogs SET name='${name}', gender='${gender}', bio='${bio}', hypo=${hypo}, neutered=${neutered}, rating=${rating}, age=${age}, size='${size}', breed='${breed}', healthy=${healthy} WHERE id=${req.params.dogid}`;
    db.query(qryStr, (err, results) => callback(err, results));
  },
  uploadPhotos: (req, url, callback) => {
    const qryStr = `INSERT INTO waw.photos(user_id, dog_id, url) VALUES (${req.params.id}, null, '${url}')`;
    db.query(qryStr, (err, results) => callback(err, results));
  },
  uploadDogPhotos: (req, url, callback) => {
    const { owner_id } = req.body;
    const qryStr = `INSERT INTO waw.photos(user_id, dog_id, url) VALUES (${owner_id}, ${req.params.dogid}, '${url}')`;
    db.query(qryStr, (err, results) => callback(err, results));
  },
  removePhotos: (req, callback) => {
    const qryStr = `DELETE FROM waw.photos WHERE waw.photos.id=${req.params.photoid}`;
    db.query(qryStr, (err, results) => callback(err, results));
  },

  // MESSAGES ------------------------------------//
  getAllConvos: (user_id, callback) => {
    const queryStr = `SELECT * FROM waw.convo WHERE user1 IN (${user_id}) OR user2 IN (${user_id});`;
    db.query(queryStr, (err, res) => {
      callback(err, res);
    });
  },
  postNewConvo: (user_id, recipient_id, callback) => {
    const queryStr = `INSERT INTO waw.convo SELECT nextval('waw.convo_id_seq'), ${user_id}, ${recipient_id}
    WHERE NOT EXISTS (SELECT id FROM waw.convo WHERE user1 in (${user_id}, ${recipient_id}) AND user2 in (${user_id}, ${recipient_id}))`;
    db.query(queryStr, (err, res) => {
      callback(err, res);
    });
  },
  getConvoMessages: (user_id, recipient_id, callback) => {
    const queryStr = `SELECT * FROM waw.message WHERE convo_id=(select id from waw.convo where user1 in (${user_id}, ${recipient_id}) and user2 in (${user_id}, ${recipient_id}))`;
    db.query(queryStr, (err, res) => {
      callback(err, res);
    });
  },
  postMessage: (user_id, recipient_id, body, callback) => {
    const queryStr = `INSERT INTO waw.message (id, sender_id, body, time_stamp, convo_id) VALUES (DEFAULT, ${user_id}, '${body.message}', DEFAULT, (select id from waw.convo where user1 in (${user_id}, ${recipient_id}) and user2 in (${user_id}, ${recipient_id})))`;
    db.query(queryStr, (err, res) => {
      callback(err, res);
    });
  },

  //CALENDAR ------------------------------------------//
  // getSchedule: (req,callback) =>{
  //   const queryStr = `SELECT * FROM waw.userSchedule WHERE user_id = ${req.params.user_id}`
  //   db.query(queryStr, (err,res)=>{
  //     callback(err,res)
  //   })
  // };
  // postSchedule: (req,callback)=> {
  //   const queryStr = `INSERT INTO waw.userSchedule(dates) VALUES (${req.params.date})WHERE user_id = ${req.params.user_id}`
  //   db.query(queryStr, (err,res)=>{
  //     callback(err,res)
  //   })
  // };
  // postAppointment: (req,callback)=> {
  //   const queryStr = `INSERT INTO waw.userAppointment(user_id, user_id2,schedule_id) VALUES (${req.params.user_id}, ${req.params.user_id2}, ${req.params.schedule_id})`
  // }


  // PROFILE LIKES ------------------------------------//
  // getAllProfileLikes: (callback) => {
  //   const queryStr = 'SELECT * from waw.profilelikes';
  //   db.query(queryStr, (err, res) => {
  //     callback(err, res);
  //   });
  // },
  getProfileLikes: (user_id, callback) => {
    const queryStr = `SELECT liked_user_id FROM waw.profilelikes WHERE user_id=${user_id}`;
    db.query(queryStr, (err, res) => {
      callback(err, res);
    });
  },
  postNewProfileLike: (user_id, liked_user_id, callback) => {
    const queryStr = `INSERT INTO waw.profilelikes SELECT nextval('waw.profilelikes_id_seq'), ${user_id}, ${liked_user_id}
    WHERE NOT EXISTS (SELECT id FROM waw.profilelikes WHERE user_id=${user_id} AND liked_user_id in (${liked_user_id}))`;
    db.query(queryStr, (err, res) => {
      callback(err, res);
    });
  },
  postNewPhotoLike: (user_id, liked_photo_id, callback) => {
    const queryStr = `INSERT INTO waw.photoLikes SELECT nextval('waw.profilelikes_id_seq'), ${user_id}, ${liked_photo_id}
    WHERE NOT EXISTS (SELECT id FROM waw.photoLikes WHERE user_id=${user_id} AND photo_id in (${liked_user_id}))`;
    db.query(queryStr, (err, res) => {
      callback(err, res);
    });
  },
  getMatches: (user_id, callback) => {
    const queryStr = `SELECT user_id FROM waw.profilelikes WHERE user_id IN (SELECT liked_user_id FROM waw.profilelikes WHERE user_id=${user_id}) AND liked_user_id=${user_id}`;
    db.query(queryStr, (err, res) => {
      callback(err, res);
    });
  },
  getProfile: (user_id, callback) => {
    const queryStr = `SELECT waw.users.name, waw.dogs.name FROM waw.users INNER JOIN waw.dogs ON waw.users.id=waw.dogs.owner_id WHERE waw.users.id=${user_id}`;
    db.query(queryStr, (err, res) => {
      callback(err, res);
    });
  },
  // FILTERS //
  getSavedFilters: (user_id, callback) => {
    const queryStr = `SELECT * FROM waw.filters WHERE waw.filters.user_id=${user_id}`;
    db.query(queryStr, (err, results) => {
      callback(err, results);
    });
  },
  updateSavedFilters: (user_id, req, callback) => {
    const {
      sizeRange,
      dogAgeRange,
      dogGenders,
      hypoallergenic,
      neutered,
      healthIssues,
      avoidBreeds,
      maxDistance,
      ownerAgeRange,
      ownerGenders,
    } = req.body;
    const queryStr = `UPDATE waw.filters SET min_size='${sizeRange[0]}', max_size='${sizeRange[1]}', dog_min_age=${dogAgeRange[0]},dog_max_age=${dogAgeRange[1]}, dog_genders='${dogGenders}', hypo=${hypoallergenic}, neutered=${neutered}, health_issues=${healthIssues}, avoid_breeds='${avoidBreeds}', max_dist=${maxDistance}, genders='${ownerGenders}', min_age=${ownerAgeRange[0]}, max_age=${ownerAgeRange[1]} WHERE user_id=${user_id}`;

    db.query(queryStr, (err, results) => callback(err, results));
  },
  postFilters: (req, res) => {
    const {
      min_size, max_size, dog_min_age, dog_max_age, dog_genders, hypo, neutered, health_issues, avoid_breeds, max_dist, genders, min_age, max_age
    } = req.body;
    db.query(
      `INSERT INTO waw.filters(user_id, min_size, max_size, dog_min_age, dog_max_age, dog_genders, hypo, neutered, health_issues, avoid_breeds, max_dist, genders, min_age, max_age) VALUES(${req.params.user_id}, '${min_size}', '${max_size}', ${dog_min_age}, ${dog_max_age}, '${dog_genders}', ${hypo}, ${neutered}, ${health_issues}, '${avoid_breeds}', ${max_dist}, '${genders}', ${min_age}, ${max_age})`,
      (err) => {
        if (err) res.send(err);
        else res.send('posted filter');
      },
    );
  },
  // REGISTRATION AND LOGIN ------------------------------------//
  postUser: (req, res) => {
    const {
      name, bio, email, hash, age, zipcode, city, searched_as,
    } = req.body;
    db.query(
      `INSERT INTO waw.users("name", bio, email, "password", age, zipcode, city, searched_as) VALUES('${name}', '${bio}', '${email}', '${hash}', ${age}, '${zipcode}', '${city}','${searched_as}') RETURNING id`,
      (err, data) => {
        if (err) res.send(err);
        else res.send(data.rows[0]);
      },
    );
  },
  postDog: (req, res) => {
    const {
      name, gender, bio, hypo, neutered, age, size, breed, healthy,
    } = req.body;
    db.query(`INSERT INTO waw.dogs(name, gender, bio, hypo, neutered, rating, owner_id, age, size, breed, healthy) VALUES ('${name}', '${gender}', '${bio}', ${hypo}, ${neutered}, 0, ${req.params.user}, ${age}, '${size}', '${breed}', ${healthy}) RETURNING id`,
      (err,data) => {
        if (err) res.send(err);
        else res.send(data.rows[0]);
      });
  },
};

module.exports = dbHelpers;

/* SELECT waw.users.*, json_agg(dogs) dogs_info FROM waw.users
LEFT JOIN (SELECT waw.dogs.owner_id, json_object_agg(waw.dogs.id, json_build_object(
  'name', waw.dogs.name, 'gender', waw.dogs.gender,
   'bio', waw.dogs.bio, 'hypo', waw.dogs.hypo, 'neutered',
  waw. dogs.neutered, 'rating', waw.dogs.rating, 'age',
   waw.dogs.age, 'size', waw.dogs.size, 'breed', waw.dogs.breed,
   'healthy', dogs.healthy
  )) dogs FROM waw.dogs GROUP BY waw.dogs.owner_id) dogs ON dogs.owner_id = waw.users.id WHERE waw.users.email = '${email}' GROUP BY waw.users.id */
