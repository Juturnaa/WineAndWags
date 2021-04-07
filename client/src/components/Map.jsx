import React from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

function Map({ location, zoomLevel }) {
  const [places, setPlaces] = React.useState([]);
  React.useEffect(() => {
    axios.get('localhost:3000/api/yelp/92833')
      .then((results) => {
        setPlaces(results);
        console.log(places);
      });
  }, []);

  function getMapBounds(map, maps, locations) {
    const bounds = new maps.LatLngBounds();
    locations.forEach((location) => {
      bounds.extend(
        new maps.LatLng(location.latitude, location.longitude),
      );
    });
    return bounds;
  }

  function bindResizeListener(map, maps, bounds) {
    maps.event.addDomListenerOnce(map, 'idle', () => {
      maps.event.addDomListener(window, 'resize', () => {
        map.fitBounds(bounds);
      });
    });
  }

  function apiIsLoaded(map, maps, locations) {
    if (map) {
      const bounds = getMapBounds(map, maps, locations);
      map.fitBounds(bounds);
      bindResizeListener(map, maps, bounds);
    }
  }

  return (
    <div className="map">

      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCSlzy473wIHHYArtLvphiwprDnzA3myKE' }}
          defaultCenter={{
            lat: 33.8797367240159,
            lng: -117.96356006545523,
          }}
          defaultZoom={13}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, parks)}
        />
      </div>
    </div>
  );
}

export default Map;
