import React from 'react';
import axios from 'axios';
import Geocode from 'react-geocode';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

import {
  Combobox,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';

import key from '../../../../config/googleConfig';
import mapStyles from './mapStyles';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
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

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
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

  function Locate({ panTo }) {
    return (
      <button
        className="compass"
        type="button"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null,
          );
        }}
      >
        <i className="far fa-compass" />
      </button>
    );
  }

  function Search() {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      ClearSuggestion,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => center.lat, lng: () => center.lng },
        radius: 200000,
      },
    });

    return (
      <div className="search">
        <Combobox onSelect={(address) => {
          console.log(address);
        }}
        >
          <ComboboxInput
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            disabled={!ready}
            placeholder="Enter and Address"
          />
          <ComboboxPopover>
            {status === 'OK' && data.map(({ id, description }) => (
              <ComboboxOption key={id} value={description} />
            ))}
          </ComboboxPopover>
        </Combobox>
      </div>
    );
  }

  if (isLoaded && places) {
    return (
      <div>
        Dog parks and Dog beaches
        <Search />
        <Locate panTo={panTo} />
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
