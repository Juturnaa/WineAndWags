import React from 'react';
import axios from 'axios';
import Geocode from 'react-geocode';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import key from '../../../../config/googleConfig.js';
import mapStyles from './mapStyles';

const libraries = ['places'];
const mapContainerStyle = {
  width: '70vw',
  height: '70vh',
};
const center = {
  lat: 33.870350,
  lng: -117.924300,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

Geocode.setApiKey(key);

function Map() {
  const [places, setPlaces] = React.useState(null);
  Geocode.fromAddress('fullerton 92833').then((response) => {
    const { lat, lng } = response.results[0].geometry.location;
    center.lat = lat;
    center.lng = lng;
  });
  React.useEffect(() => {
    axios.get('http://localhost:3000/app/yelp', {
      params: {
        location: {
          latitude: center.lat,
          longitude: center.lng,
        },
      },
    })
      .then((results) => {
        setPlaces([...new Set(results.data)]);
      }).then(() => console.log('places', places)).catch((err) => console.log(err));
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key,
    libraries,
  });

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (isLoaded && places) {
    return (
      <div>
        Dog parks and Dog beaches
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={11}
          center={center}
          options={options}
          onLoad={onMapLoad}
        >
          {places.map((place) => (
            <Marker
              key={place.id}
              position={{
                lat: place.coordinates.latitude,
                lng: place.coordinates.longitude,
              }}
            />
          ))}
        </GoogleMap>
      </div>

    );
  }
  return null;
}

export default Map;
