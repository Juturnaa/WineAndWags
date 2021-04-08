
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from '@material-ui/core/Slider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import BackspaceIcon from '@material-ui/icons/Backspace';
import Geocode from 'react-geocode';
import key from '../../../../config/googleConfig.js';

Geocode.setApiKey(key);

export default function Filters({
  sizeRange, changeSizeRange,
  dogAgeRange, changeDogAgeRange,
  dogGenders, changeDogGenders,
  hypoallergenic, changeHypoallergenic,
  neutered, changeNeutered,
  healthIssues, changeHealthIssues,
  avoidBreeds, changeAvoidedBreeds,
  preferredBreeds, changePreferredBreeds,
  maxDistance, changeMaxDistance,
  ownerAgeRange, changeOwnerAgeRange,
  ownerGenders, changeOwnerGenders,
  close, setFilterParams,
  currentUser, currentUserID,
  potiential,
}) {

  const [myLocation, changeMyLocation] = useState([]);
  const [zipCodes, changeZipCodes] = useState(["91741"]);

  const getLocation = (city, zipcode) => {
    Geocode.fromAddress(`${city} ${zipcode}`)
      .then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        changeMyLocation([lat, lng])
        getZipCodesInRadius(lat, lng, maxDistance);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const getZipCodesInRadius = (lat, long, radius) => {
    const options = {
      method: 'GET',
      url: 'https://vanitysoft-boundaries-io-v1.p.rapidapi.com/reaperfire/rest/v1/public/boundary/zipcode/location',
      params: {latitude: lat, longitude: long, radius: radius},
      headers: {
        'x-rapidapi-key': 'ffb591a7abmsh204544556caf1a4p158ab3jsn0e0cf2bc1b2a',
        'x-rapidapi-host': 'vanitysoft-boundaries-io-v1.p.rapidapi.com'
      }
    };
    axios.request(options).then(function (response) {
      let uniqueZips = [];
      for (let item of response.data.features) {
        if (!uniqueZips.includes(item.properties.zipCode)) {
          uniqueZips.push(`'${item.properties.zipCode}'`)
        }
      }
      changeZipCodes(uniqueZips.join(','));
    }).catch(function (error) {
      console.error(error);
    });
  }

  useEffect(() => {
    if (currentUser.city && currentUser.zipcode) {
      getLocation(currentUser.city, currentUser.zipcode)
      updateFilterParams();
    }
  }, [currentUser])

  const breeds = [
    'Affenpinscher',
    'Afghan Hound',
    'Aidi',
    'Airedale Terrier',
    'Akbash Dog',
    'Akita',
    'Alano Español',
    'Alaskan Klee Kai',
    'Alaskan Malamute',
    'Alpine Dachsbracke',
    'Alpine Spaniel',
    'American Bulldog',
    'American Cocker Spaniel',
    'American Eskimo Dog',
    'American Foxhound',
    'American Hairless Terrier',
    'American Pit Bull Terrier',
    'American Staffordshire Terrier',
    'American Water Spaniel',
    'Anglo-Français de Petite Vénerie',
    'Appenzeller Sennenhund',
    'Ariege Pointer',
    'Ariegeois',
    'Armant',
    'Armenian Gampr dog',
    'Artois Hound',
    'Australian Cattle Dog',
    'Australian Kelpie',
    'Australian Shepherd',
    'Australian Silky Terrier',
    'Australian Stumpy Tail Cattle Dog',
    'Australian Terrier',
    'Azawakh',
    'Bakharwal Dog',
    'Barbet',
    'Basenji',
    'Basque Shepherd Dog',
    'Basset Artésien Normand',
    'Basset Bleu de Gascogne',
    'Basset Fauve de Bretagne',
    'Basset Hound',
    'Bavarian Mountain Hound',
    'Beagle',
    'Beagle-Harrier',
    'Bearded Collie',
    'Beauceron',
    'Bedlington Terrier',
    'Belgian Shepherd Dog (Groenendael)',
    'Belgian Shepherd Dog (Laekenois)',
    'Belgian Shepherd Dog (Malinois)',
    'Bergamasco Shepherd',
    'Berger Blanc Suisse',
    'Berger Picard',
    'Berner Laufhund',
    'Bernese Mountain Dog',
    'Billy',
    'Black and Tan Coonhound',
    'Black and Tan Virginia Foxhound',
    'Black Norwegian Elkhound',
    'Black Russian Terrier',
    'Bloodhound',
    'Blue Lacy',
    'Blue Paul Terrier',
    'Boerboel',
    'Bohemian Shepherd',
    'Bolognese',
    'Border Collie',
    'Border Terrier',
    'Borzoi',
    'Boston Terrier',
    'Bouvier des Ardennes',
    'Bouvier des Flandres',
    'Boxer',
    'Boykin Spaniel',
    'Bracco Italiano',
    'Braque du Bourbonnais',
    'Braque du Puy',
    'Braque Francais',
    'Braque Saint-Germain',
    'Brazilian Terrier',
    'Briard',
    'Briquet Griffon Vendéen',
    'Brittany',
    'Broholmer',
    'Bruno Jura Hound',
    'Bucovina Shepherd Dog',
    'Bull and Terrier',
    'Bull Terrier (Miniature)',
    'Bull Terrier',
    'Bulldog',
    'Bullenbeisser',
    'Bullmastiff',
    'Bully Kutta',
    'Burgos Pointer',
    'Cairn Terrier',
    'Canaan Dog',
    'Canadian Eskimo Dog',
    'Cane Corso',
    'Cardigan Welsh Corgi',
    'Carolina Dog',
    'Carpathian Shepherd Dog',
    'Catahoula Cur',
    'Catalan Sheepdog',
    'Caucasian Shepherd Dog',
    'Cavalier King Charles Spaniel',
    'Central Asian Shepherd Dog',
    'Cesky Fousek',
    'Cesky Terrier',
    'Chesapeake Bay Retriever',
    'Chien Français Blanc et Noir',
    'Chien Français Blanc et Orange',
    'Chien Français Tricolore',
    'Chien-gris',
    'Chihuahua',
    'Chilean Fox Terrier',
    'Chinese Chongqing Dog',
    'Chinese Crested Dog',
    'Chinese Imperial Dog',
    'Chinook',
    'Chippiparai',
    'Chow Chow',
    'Cierny Sery',
    'Cimarrón Uruguayo',
    'Clumber Spaniel',
    'Combai',
    'Cordoba Fighting Dog',
    'Coton de Tulear',
    'Cretan Hound',
    'Croatian Sheepdog',
    'Cumberland Sheepdog',
    'Curly Coated Retriever',
    'Cursinu',
    'Cão da Serra de Aires',
    'Cão de Castro Laboreiro',
    'Cão Fila de São Miguel',
    'Dachshund',
    'Dalmatian',
    'Dandie Dinmont Terrier',
    'Danish Swedish Farmdog',
    'Deutsche Bracke',
    'Doberman Pinscher',
    'Dogo Argentino',
    'Dogo Cubano',
    'Dogue de Bordeaux',
    'Drentse Patrijshond',
    'Drever',
    'Dunker',
    'Dutch Shepherd Dog',
    'Dutch Smoushond',
    'East Siberian Laika',
    'East-European Shepherd',
    'Elo',
    'English Cocker Spaniel',
    'English Foxhound',
    'English Mastiff',
    'English Setter',
    'English Shepherd',
    'English Springer Spaniel',
    'English Toy Terrier (Black &amp; Tan)',
    'English Water Spaniel',
    'English White Terrier',
    'Entlebucher Mountain Dog',
    'Estonian Hound',
    'Estrela Mountain Dog',
    'Eurasier',
    'Field Spaniel',
    'Fila Brasileiro',
    'Finnish Hound',
    'Finnish Lapphund',
    'Finnish Spitz',
    'Flat-Coated Retriever',
    'Formosan Mountain Dog',
    'Fox Terrier (Smooth)',
    'French Bulldog',
    'French Spaniel',
    'Galgo Español',
    'Gascon Saintongeois',
    'German Longhaired Pointer',
    'German Pinscher',
    'German Shepherd',
    'German Shorthaired Pointer',
    'German Spaniel',
    'German Spitz',
    'German Wirehaired Pointer',
    'Giant Schnauzer',
    'Glen of Imaal Terrier',
    'Golden Retriever',
    'Gordon Setter',
    'Gran Mastín de Borínquen',
    'Grand Anglo-Français Blanc et Noir',
    'Grand Anglo-Français Blanc et Orange',
    'Grand Anglo-Français Tricolore',
    'Grand Basset Griffon Vendéen',
    'Grand Bleu de Gascogne',
    'Grand Griffon Vendéen',
    'Great Dane',
    'Great Pyrenees',
    'Greater Swiss Mountain Dog',
    'Greek Harehound',
    'Greenland Dog',
    'Greyhound',
    'Griffon Bleu de Gascogne',
    'Griffon Bruxellois',
    'Griffon Fauve de Bretagne',
    'Griffon Nivernais',
    'Hamiltonstövare',
    'Hanover Hound',
    'Hare Indian Dog',
    'Harrier',
    'Havanese',
    'Hawaiian Poi Dog',
    'Himalayan Sheepdog',
    'Hokkaido',
    'Hovawart',
    'Huntaway',
    'Hygenhund',
    'Ibizan Hound',
    'Icelandic Sheepdog',
    'Indian pariah dog',
    'Indian Spitz',
    'Irish Red and White Setter',
    'Irish Setter',
    'Irish Terrier',
    'Irish Water Spaniel',
    'Irish Wolfhound',
    'Istrian Coarse-haired Hound',
    'Istrian Shorthaired Hound',
    'Italian Greyhound',
    'Jack Russell Terrier',
    'Jagdterrier',
    'Jämthund',
    'Kai Ken',
    'Kaikadi',
    'Kanni',
    'Karelian Bear Dog',
    'Karst Shepherd',
    'Keeshond',
    'Kerry Beagle',
    'Kerry Blue Terrier',
    'King Charles Spaniel',
    'King Shepherd',
    'Kintamani',
    'Kishu',
    'Komondor',
    'Kooikerhondje',
    'Koolie',
    'Korean Jindo Dog',
    'Kromfohrländer',
    'Kumaon Mastiff',
    'Kurī',
    'Kuvasz',
    'Kyi-Leo',
    'Labrador Husky',
    'Labrador Retriever',
    'Lagotto Romagnolo',
    'Lakeland Terrier',
    'Lancashire Heeler',
    'Landseer',
    'Lapponian Herder',
    'Large Münsterländer',
    'Leonberger',
    'Lhasa Apso',
    'Lithuanian Hound',
    'Longhaired Whippet',
    'Löwchen',
    'Mahratta Greyhound',
    'Maltese',
    'Manchester Terrier',
    'Maremma Sheepdog',
    'McNab',
    'Mexican Hairless Dog',
    'Miniature American Shepherd',
    'Miniature Australian Shepherd',
    'Miniature Fox Terrier',
    'Miniature Pinscher',
    'Miniature Schnauzer',
    'Miniature Shar Pei',
    'Molossus',
    'Montenegrin Mountain Hound',
    'Moscow Watchdog',
    'Moscow Water Dog',
    'Mountain Cur',
    'Mucuchies',
    'Mudhol Hound',
    'Mudi',
    'Neapolitan Mastiff',
    'New Zealand Heading Dog',
    'Newfoundland',
    'Norfolk Spaniel',
    'Norfolk Terrier',
    'Norrbottenspets',
    'North Country Beagle',
    'Northern Inuit Dog',
    'Norwegian Buhund',
    'Norwegian Elkhound',
    'Norwegian Lundehund',
    'Norwich Terrier',
    'Old Croatian Sighthound',
    'Old Danish Pointer',
    'Old English Sheepdog',
    'Old English Terrier',
    'Old German Shepherd Dog',
    'Olde English Bulldogge',
    'Otterhound',
    'Pachon Navarro',
    'Paisley Terrier',
    'Pandikona',
    'Papillon',
    'Parson Russell Terrier',
    'Patterdale Terrier',
    'Pekingese',
    'Pembroke Welsh Corgi',
    'Perro de Presa Canario',
    'Perro de Presa Mallorquin',
    'Peruvian Hairless Dog',
    'Petit Basset Griffon Vendéen',
    'Petit Bleu de Gascogne',
    'Phalène',
    'Pharaoh Hound',
    'Phu Quoc ridgeback dog',
    'Picardy Spaniel',
    'Plott Hound',
    'Podenco Canario',
    'Pointer (dog breed)',
    'Polish Greyhound',
    'Polish Hound',
    'Polish Hunting Dog',
    'Polish Lowland Sheepdog',
    'Polish Tatra Sheepdog',
    'Pomeranian',
    'Pont-Audemer Spaniel',
    'Poodle',
    'Porcelaine',
    'Portuguese Podengo',
    'Portuguese Pointer',
    'Portuguese Water Dog',
    'Posavac Hound',
    'Pražský Krysařík',
    'Pudelpointer',
    'Pug',
    'Puli',
    'Pumi',
    'Pungsan Dog',
    'Pyrenean Mastiff',
    'Pyrenean Shepherd',
    'Rafeiro do Alentejo',
    'Rajapalayam',
    'Rampur Greyhound',
    'Rastreador Brasileiro',
    'Rat Terrier',
    'Ratonero Bodeguero Andaluz',
    'Redbone Coonhound',
    'Rhodesian Ridgeback',
    'Rottweiler',
    'Rough Collie',
    'Russell Terrier',
    'Russian Spaniel',
    'Russian tracker',
    'Russo-European Laika',
    'Sabueso Español',
    'Saint-Usuge Spaniel',
    'Sakhalin Husky',
    'Saluki',
    'Samoyed',
    'Sapsali',
    'Schapendoes',
    'Schillerstövare',
    'Schipperke',
    'Schweizer Laufhund',
    'Schweizerischer Niederlaufhund',
    'Scotch Collie',
    'Scottish Deerhound',
    'Scottish Terrier',
    'Sealyham Terrier',
    'Segugio Italiano',
    'Seppala Siberian Sleddog',
    'Serbian Hound',
    'Serbian Tricolour Hound',
    'Shar Pei',
    'Shetland Sheepdog',
    'Shiba Inu',
    'Shih Tzu',
    'Shikoku',
    'Shiloh Shepherd Dog',
    'Siberian Husky',
    'Silken Windhound',
    'Sinhala Hound',
    'Skye Terrier',
    'Sloughi',
    'Slovak Cuvac',
    'Slovakian Rough-haired Pointer',
    'Small Greek Domestic Dog',
    'Small Münsterländer',
    'Smooth Collie',
    'South Russian Ovcharka',
    'Southern Hound',
    'Spanish Mastiff',
    'Spanish Water Dog',
    'Spinone Italiano',
    'Sporting Lucas Terrier',
    'St. Bernard',
    'Stabyhoun',
    'Staffordshire Bull Terrier',
    'Standard Schnauzer',
    'Stephens Cur',
    'Styrian Coarse-haired Hound',
    'Sussex Spaniel',
    'Swedish Lapphund',
    'Swedish Vallhund',
    'Tahltan Bear Dog',
    'Taigan',
    'Talbot',
    'Tamaskan Dog',
    'Teddy Roosevelt Terrier',
    'Telomian',
    'Tenterfield Terrier',
    'Thai Bangkaew Dog',
    'Thai Ridgeback',
    'Tibetan Mastiff',
    'Tibetan Spaniel',
    'Tibetan Terrier',
    'Tornjak',
    'Tosa',
    'Toy Bulldog',
    'Toy Fox Terrier',
    'Toy Manchester Terrier',
    'Toy Trawler Spaniel',
    'Transylvanian Hound',
    'Treeing Cur',
    'Treeing Walker Coonhound',
    'Trigg Hound',
    'Tweed Water Spaniel',
    'Tyrolean Hound',
    'Vizsla',
    'Volpino Italiano',
    'Weimaraner',
    'Welsh Sheepdog',
    'Welsh Springer Spaniel',
    'Welsh Terrier',
    'West Highland White Terrier',
    'West Siberian Laika',
    'Westphalian Dachsbracke',
    'Wetterhoun',
    'Whippet',
    'White Shepherd',
    'Wire Fox Terrier',
    'Wirehaired Pointing Griffon',
    'Wirehaired Vizsla',
    'Yorkshire Terrier',
    'Šarplaninac',
  ];

  // XS, S, M, L, XL
  const sizeLabels = [
    {
      value: 0,
      label: 'XS',
    },
    {
      value: 1,
      label: 'S',
    },
    {
      value: 2,
      label: 'M',
    },
    {
      value: 3,
      label: 'L',
    },
    {
      value: 4,
      label: 'XL',
    }
  ];

  const displaySizeRangeAsString = (first, second) => {
    if (first !== undefined && second !== undefined) {
      return `${sizeLabels[first].label} - ${sizeLabels[second].label}`
    }
  }

  const sliderStyle = {
    width: '50%'
  }

  // transforming data to work with filter params for get random profile
  const getSizeRange = (min, max) => {
    const sizes = ['XS', 'S', 'M', 'L', 'XL']
    let result = []
    for (let i = min; i <= max; i++) {
      result.push(`'${sizes[i]}'`)
    }
    return result.join(',')
  }

  // PATCH user settings
  const saveChanges = () => {
    const sizeNumToString = (n) => {
      if (n === 0) return 'XS'
      if (n === 1) return 'S'
      if (n === 2) return 'M'
      if (n === 3) return 'L'
      if (n === 4) return 'XL'
    }
    const values = {
      sizeRange: [sizeNumToString(sizeRange[0]), sizeNumToString(sizeRange[1])],
      dogGenders,
      dogAgeRange,
      hypoallergenic,
      neutered,
      healthIssues,
      avoidBreeds: avoidBreeds.join(','),
      maxDistance,
      ownerAgeRange,
      ownerGenders
    }

    axios.patch(`app/${currentUserID}/filters`, values)
      .then((results) => {
        updateFilterParams()
        getLocation(currentUser.city, currentUser.zipcode) // getLocation also updates valid zip codes in max distance filter radius
        alert('updated preferences');
      })
      .catch((err) => console.error(err));
  }

  const updateFilterParams = () => {
    const params = {
      sizeRange: getSizeRange(sizeRange[0], sizeRange[1]),
      dogGenders,
      dogAgeRange,
      hypoallergenic,
      neutered,
      healthIssues,
      avoidBreeds: avoidBreeds.join(','),
      zipCodes,
      ownerAgeRange,
      ownerGenders
    }
    setFilterParams(params)
  }

  return (
    <div className='filter-modal'>
      <div>
        <IconButton onClick={() => close(false)} color="primary" aria-label="close-filter-modal"><BackspaceIcon /></IconButton>
      </div>
      <div className='filter-container'>
        <div className='owner-filters'>
          <Typography variant="h4" gutterBottom>Owner</Typography>
          <Typography variant="body1">Age range: {ownerAgeRange[0]}-{ownerAgeRange[1]}</Typography>
          <Slider style={sliderStyle} value={ownerAgeRange} onChange={(e, val) => changeOwnerAgeRange(val)} aria-labelledby="range-slider" min={18} max={100} />
          <Typography variant="body1">Max distance: {maxDistance} miles</Typography>
          <Slider style={sliderStyle} value={maxDistance} onChange={(e, val) => changeMaxDistance(val)} aria-labelledby="continuous-slider" min={0} max={50} />
          <Typography variant="body1">Genders</Typography>
          <FormControl component="fieldset">
            <RadioGroup row aria-label="gender" name="gender_owner" value={ownerGenders} onChange={(e, val) => changeOwnerGenders(val)}>
              <FormControlLabel value="M" control={<Radio color="primary" />} label="Male" />
              <FormControlLabel value="F" control={<Radio color="primary" />} label="Female" />
              <FormControlLabel value="All" control={<Radio color="primary" />} label="All" />
            </RadioGroup>
          </FormControl>
          <Button variant="contained" style={{ width: '10rem', marginTop: '2.5rem' }} color="primary" onClick={() => saveChanges()}>Apply changes</Button>
        </div>
        <div className='dog-filters'>
          <Typography variant="h4" gutterBottom>Dog</Typography>
          <Typography variant="body1">Age range: {dogAgeRange[0]}-{dogAgeRange[1]}</Typography>
          <Slider style={sliderStyle} value={dogAgeRange} onChange={(e, val) => changeDogAgeRange(val)} aria-labelledby="range-slider" min={0} max={20} />
          <Typography variant="body1">Size range: {displaySizeRangeAsString(sizeRange[0], sizeRange[1])}</Typography>
          <Slider style={sliderStyle}
            value={sizeRange}
            onChange={(e, val) => changeSizeRange(val)}
            marks={sizeLabels}
            step={1}
            min={0}
            max={4}
          />
          <Typography variant="body1">Genders</Typography>
          <FormControl component="fieldset">
            <RadioGroup row aria-label="gender" name="gender_dog" value={dogGenders} onChange={(e, val) => changeDogGenders(val)}>
              <FormControlLabel value="M" control={<Radio color="primary" />} label="Male" />
              <FormControlLabel value="F" control={<Radio color="primary" />} label="Female" />
              <FormControlLabel value="Both" control={<Radio color="primary" />} label="Both" />
            </RadioGroup>
          </FormControl>
          <Typography variant="body1">Information</Typography>
          <FormControlLabel
            control={<Checkbox color="primary" checked={hypoallergenic} onChange={() => changeHypoallergenic(!hypoallergenic)} name="hypoallergenic" />}
            label="Hypoallergenic"
          />
          <FormControlLabel
            control={<Checkbox color="primary" checked={neutered} onChange={() => changeNeutered(!neutered)} name="neutered" />}
            label="Neutered/Spayed"
          />
          <FormControlLabel
            control={<Checkbox color="primary" checked={healthIssues} onChange={() => changeHealthIssues(!healthIssues)} name="healthIssues" />}
            label="Health issues"
          />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography variant="body1" style={{ marginRight: '1rem' }}>Avoid breeds:</Typography>
            <FormControl>
              <Select
                multiple
                value={avoidBreeds}
                onChange={(e) => changeAvoidedBreeds(e.target.value)}
                input={<Input />}
                style={{ marginRight: '1rem', minWidth: 150, maxWidth: 400 }}
              >
                {breeds.map((breed) => (
                  <MenuItem key={breed} value={breed}>
                    {breed}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  )
}