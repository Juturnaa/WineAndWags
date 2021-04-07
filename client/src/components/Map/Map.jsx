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

function Map({ currentUser }) {
  const [places, setPlaces] = React.useState(null);
  const [selected, setSelected] = React.useState(null);
  Geocode.fromAddress(`${currentUser.city} ${currentUser.zipcode}`).then((response) => {
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
        console.log('results', results);
        const filteredResults = Array.from(new Set(results.data.map((a) => a.id))).map((id) => results.data.find((a) => a.id === id));
        setPlaces(filteredResults);
        console.log('filtered', filteredResults);
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

  const dblClick = (e) => {
    axios.get('http://localhost:3000/app/yelp', {
      params: {
        location: {
          latitude: e.latLng.lat(),
          longitude: e.latLng.lng(),
        },
      },
    })
      .then((results) => {
        console.log('results', results);
        const filteredResults = Array.from(new Set(results.data.map((a) => a.id))).map((id) => results.data.find((a) => a.id === id));
        setPlaces(filteredResults);
        console.log('filtered', filteredResults);
      }).then(() => console.log('places', places)).catch((err) => console.log(err));
  };

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
          onDblClick={dblClick}
        >
          {places.map((place) => (
            <Marker
              key={place.id}
              position={{
                lat: place.coordinates.latitude,
                lng: place.coordinates.longitude,
              }}
              onClick={() => {
                setSelected(place);
              }}
            />
          ))}

          {selected ? (
            <InfoWindow
              position={{
                lat: selected.coordinates.latitude,
                lng: selected.coordinates.longitude,
              }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                <img src={`${selected.image_url}`} alt="" width="100" height="50" />
                <h5>{selected.name}</h5>
                <div>{`${selected.location.display_address[0]}`}</div>
                <div>{`${selected.location.display_address[1]}`}</div>
                <div>{selected.display_phone}</div>
                <a href={`${selected.url}`}>Yelp Page</a>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>

    );
  }
  return null;
}

export default Map;
