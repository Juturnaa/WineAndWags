/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './Navbar';
import breedData from '../dummyData/dogBreed';
import Landing from './Landing';
import Register from './Register';
import ReviewModal from './Homepage/ReviewModal';

const App = () => {
  const [currentUserID, setCurrentID] = useState(7);
  const [register, setRegister] = useState(false);
  const [landing, setLanding] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [currentDogs, setCurrentDogs] = useState([]);
  const [breeds, setBreeds] = useState(breedData);
  const [humanPhoto, setHumanPhoto] = useState([]);
  const [dogsPhoto, setDogsPhoto] = useState([]);
  const [dogsImg, setDogsImg] = useState([]);
  const [matches, setMatches] = useState([]);
  const [matchesInfo, setMatchesInfo] = useState([]);
  const [matchesPhotos, setMatchesPhotos] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [reviewModal, setReviewModal] = useState(false);

  // potiential Match User states
  const [potiential, setPotiential] = useState();
  const [potientialDog, setPotientialDog] = useState();
  const [potientialPhoto, setPotientialPhoto] = useState();
  const [showNotifs, setShowNotifs] = useState(false);

  useEffect(() => {
    const dogsimages = [];
    const store = [];
    if (dogsPhoto.length > 0) {
      for (let i = 0; i < dogsPhoto.length; i++) {
        const ind = store.indexOf(dogsPhoto[i].dog_id);
        if (ind > -1) {
          dogsimages[ind][dogsPhoto[i].dog_id].push(dogsPhoto[i]);
        } else {
          const dogsKey = {};
          dogsKey[dogsPhoto[i].dog_id] = [dogsPhoto[i]];
          dogsimages.push(dogsKey);
          store.push(dogsPhoto[i].dog_id);
        }
      }
    }
    setDogsImg(dogsimages);
  }, [dogsPhoto]);

  const getRandomUser = (filters) => {
    let random;
    axios.get('/app/users/random-profile', { params: { filters } })
      .then((data) => {
        random = Math.floor(Math.random() * (data.data.length - 0) + 0);
        setPotiential(data.data[random]);
        setPotientialDog(data.data[random].dogs_info);
      })
      .then(() => {
        axios.get(`/app/users/photos/${random + 1}`)
          .then((data) => {
            setPotientialPhoto(data.data);
          });
      });
  };
  const likeProfile = (id) => {
    let myLikes;
    axios.get(`/app/${currentUserID}/profile-likes`)
      .then((data) => {
        myLikes = data.data.map((likeObj) => likeObj.liked_user_id)
        if (myLikes.includes(potiential.id)) {
          axios.post(`/app/${currentUserID}/convos`, {recipient_id: potiential.id})
            .then(() => {
              alert('its a match!')
            })
        }
      })
      .catch((err) => console.log(err))
    axios.post(`/app/${currentUser.id}/profile-likes`, { liked_user_id: id })
      .then((data) => {
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const likePhoto = (photoId) => {
    axios.post(`/app/${currentUser.id}/photo-likes`, { liked_photo_id: photoId })
      .then((data) => {
      })
      .catch((err) => {
        console.log(err);
      });
      axios.post(`/app/notifications/${currentUser.id}`, {
        type: 'photoLike',
        type_id: photoId,
        recipient_id: potiential.id,
        sender_name: potiential.name
      })
      .catch((err) => console.log(err))
  };

  useEffect(() => {
    axios.all([
      axios.get(`/app/users/my-profile/${currentUserID}`),
      axios.get(`/app/users/photos/${currentUserID}`),
      axios.get(`/app/dates/${currentUserID}`),
    ])
      .then(axios.spread((one, two, three) => {
        setCurrentUser(one.data);
        setCurrentDogs(one.data.dogs_info);
        const human = [];
        const dogs = [];
        let fixedAppt = three.data;
        for (let i = 0; i < two.data.length; i++) {
          if (two.data[i].dog_id === null) {
            human.push(two.data[i]);
          } else {
            dogs.push(two.data[i]);
          }
        }
        if (three.data.length > 0) {
          for (let i = 0; i < three.data.length; i++) {
            if (three.data[i].reviewed) {
              fixedAppt = fixedAppt.slice(0, i).concat(fixedAppt.slice(i + 1, three.data.length));
            }
          }
        }
        setHumanPhoto(human);
        setDogsPhoto(dogs);
        setAppointment(fixedAppt);
      }))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (currentUser.id) {
      axios.get(`/app/${currentUser.id}/matches`)
        .then((results) => {
          setMatches(results.data);
        })
        .catch((err) => console.log(err));
    }
  }, [currentUser]);

  useEffect(() => {
    const matchPhotos = [];
    matches.map((match) => axios.get(`/app/users/photos/${match.user_id}`)
      .then((results) => {
        matchPhotos.push(results.data);
      })
      .catch((err) => console.log(err)));
    setMatchesPhotos(matchPhotos);
  }, [matches]);

  useEffect(() => {
    const messages = {};
    matches.map((match) => {
      axios.get(`/app/${currentUser.id}/convos/${match.user_id}`)
        .then((results) => {
          messages[match.user_id] = results.data;
        })
        .catch((err) => console.log(err));
    });
    setAllMessages(messages);
  }, [matches]);

  useEffect(() => {
    const info = {};
    matches.map((match) => {
      axios.get(`/app/users/my-profile/${match.user_id}`)
        .then((results) => {
          info[results.data.id] = results.data;
        })
        .catch((err) => console.log(err));
    });
    setMatchesInfo(info);
  }, [matches]);

  useEffect(() => {
    if (appointment.length > 0) {
      setReviewModal(!reviewModal);
    }
  }, [appointment]);

  // if (landing) {
  //   return (<Landing setLanding={setLanding} setRegister={setRegister} setCurrentID={setCurrentID} />);
  // }
  // if (register) {
  //   return (
  //     <Register setCurrentID={setCurrentID} setRegister={setRegister} setLanding={setLanding} />
  //   );
  // }

  return (
    <div>
      {reviewModal ? <ReviewModal reviewModal={reviewModal} setReviewModal={setReviewModal} appointment={appointment || ''} /> : null}
      <NavBar
        likePhoto={likePhoto}
        likeProfile={likeProfile}
        humanPhoto={humanPhoto || ''}
        dogsImg={dogsImg}
        getRandomUser={getRandomUser}
        currentUser={currentUser}
        breeds={breeds}
        currentDogs={currentDogs}
        matches={matches}
        matchesPhotos={matchesPhotos}
        matchesInfo={matchesInfo}
        allMessages={allMessages}
        currentUserID={currentUserID}
        potiential={potiential}
        potientialDog={potientialDog}
        showNotifs={showNotifs}
        setShowNotifs={setShowNotifs}
      />
    </div>
  );
};

export default App;
