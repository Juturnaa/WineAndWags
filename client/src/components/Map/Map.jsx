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
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';

import key from '../../../../config/googleConfig';
import mapStyles from './mapStyles';

import CircularProgress from '@material-ui/core/CircularProgress';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '95vh',
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

  function getPlaces(lat, lng) {
    axios.get('http://localhost:3000/app/yelp', {
      params: {
        location: {
          latitude: lat,
          longitude: lng,
        },
      },
    })
      .then((results) => {
        const filteredResults = Array.from(new Set(
          results.data.map((a) => a.id),
        )).map((id) => results.data.find((a) => a.id === id));
        setPlaces(filteredResults);
      }).catch((err) => console.log(err));
  }

  React.useEffect(() => {
    Geocode.fromAddress(`${currentUser.city} ${currentUser.zipcode}`).then((response) => {
      const { lat, lng } = response.results[0].geometry.location;
      center.lat = lat;
      center.lng = lng;
      getPlaces(center.lat, center.lng);
    });
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
    getPlaces(e.latLng.lat(), e.latLng.lng());
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
              getPlaces(position.coords.latitude, position.coords.longitude);
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
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => center.lat, lng: () => center.lng },
        radius: 200000,
      },
    });

    return (
      <div className="search">
        <Combobox
          onSelect={async (address) => {
            setValue(address, false);
            clearSuggestions();
            try {
              const results = await getGeocode({ address });
              const { lat, lng } = await getLatLng(results[0]);
              panTo({ lat, lng });
              getPlaces(lat, lng);
            } catch (error) {
              console.log('error!');
            }
          }}
        >
          <ComboboxInput
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            disabled={!ready}
            placeholder="Enter an Address"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === 'OK' && data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
    );
  }


  return (
    <div>
      {isLoaded && places ?
        <React.Fragment>
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
        </React.Fragment>
        : <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh'}}><CircularProgress color="secondary" /></div>
      }
    </div>
  );

}

export default Map;
