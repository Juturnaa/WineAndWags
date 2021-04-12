import React, { useState, useEffect } from 'react';
import PhotosList from './PhotosList';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    customHoverFocus: {
      color: '#6b4d57',
      "&:hover": { color: "#DDC8C4" }
    }
  }));



const DogView = ({ dog, dogPhotos, likePhoto, updateDogIndex, isDisplayingSkipDogs, potientialDogsImg }) => {
  const classes = useStyles();
  const [gender, setGender] = useState('');
  const [size, setSize] = useState('');
  const [currentDogsPhotos, setCurrentDogsPhotos] = useState()
  useEffect(() => {
    if (dog) {
      if (dog.gender === 'M') {
        setGender('Male')
      } else if (dog.gender === 'F') {
        setGender('Female')
      } else {
        setGender('Non-Binary')
      }
    }
    if (dog.size) {
      if (dog.size === 'XS') {
        setSize('Extra Small')
      } else if (dog.size === 'S') {
        setSize('Small')
      } else if (dog.size === 'M') {
        setSize('Medium')
      } else if (dog.size === 'L') {
        setSize('Large')
      } else if (dog.size === 'XL') {
        setSize('Extra Large')
      }
    }

  }, [dog])

  useEffect(() => {
    if (potientialDogsImg && dog.id) {
      transformPhotos(potientialDogsImg)
    }
  }, [potientialDogsImg, dog])

  const transformPhotos = (photos) => {
    let newPhotos = [];
    for (let i = 0; i < photos.length; i++) {
      if (photos[i][dog.id]) {
        newPhotos.push(photos[i][dog.id][0])
      }
    }
    setCurrentDogsPhotos(newPhotos)
  }

    const userPhotos = [
        {
          id: 1,
          url:
                'https://thehappypuppysite.com/wp-content/uploads/2019/04/Red-Toy-Poodle-HP-long.jpg',
        },
        {
          id: 2,
          url:
                'https://thehappypuppysite.com/wp-content/uploads/2019/07/HP-Miniature-Poodle-Colors-long.jpg',
        },
        {
          id: 3,
          url:
                'https://previews.123rf.com/images/fotojagodka/fotojagodka1501/fotojagodka150100109/35764138-two-red-and-apricot-standard-poodles-on-white-background.jpg',
        },
        {
          id: 4,
          url: 'https://previews.123rf.com/images/mawproductions/mawproductions1105/mawproductions110500020/9493652-two-poodles-on-white-background.jpg',
        },
      ];
    return (
        <div className="profile-card" >
            
            <div className="photo-container">
                    <PhotosList likePhoto={likePhoto} photos={currentDogsPhotos || ''} />
                    <div className="card-text" >
                      <div id="card-name">
                        <div>{dog.name || "No name"}</div>                        
                        {isDisplayingSkipDogs ?  <div><ArrowForwardIcon className={classes.customHoverFocus} style={{ fontSize: '50px', marginLeft: '50%', marginTop: '1%' }} onClick={updateDogIndex}/></div>  : '' }
                      </div>
                      <div className="text-component" style={{flexDirection:"row"}}><div className="text-component-key" style={{minWidth:"fit-content", marginRight:'5'}}>About Me: </div> <div className="text-component-value"> {dog.bio} </div></div>
                    <div className="card-text-info">
                      <div className="text-component"><div className="text-component-key">Age: </div> <div className="text-component-value"> {dog.age} </div>  </div>
                      <div className="text-component"><div className="text-component-key">Gender: </div> <div className="text-component-value"> {gender} </div>  </div>
                      <div className="text-component"><div className="text-component-key">Breed: </div> <div className="text-component-value"> {dog.breed} </div></div>
                      <div className="text-component"><div className="text-component-key">Size: </div> <div className="text-component-value"> {size} </div></div>
                      <div className="text-component"><div className="text-component-key">Health: </div> <div className="text-component-value"> {dog.healthy ? 'Healthy as can be!' : 'Could be better..'} </div>  </div>
                      <div className="text-component"><div className="text-component-key">Neutered: </div> <div className="text-component-value"> {dog.neutered ? 'Yes' : 'No'} </div>   </div>
                      <div className="text-component"><div className="text-component-key">Hypoallergenic: </div> <div className="text-component-value"> {dog.hypo ? 'Yes' : 'No'} </div>  </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default DogView;

