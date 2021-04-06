import React from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

function Map({ location, zoomLevel }) {
  const [parks, setParks] = React.useState([]);
  React.useEffect(() => {
    // axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search', {
    //   json: true,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer FCjYuGUU6sDdV4pbWxqy23I_UsG730pGsK6b5euAEsgmoU6l3UVN2YR5WfIhuiDIZAxfwBxulDU7XUoOGXpbAPb__VPZFuOTo5qY4eNNSsf8LpPqe9GiXFp1rFJrYHYx',
    //     accept: 'application/json',
    //     'x-requested-with': 'xmlhttprequest',
    //     'Access-Control-Allow-Origin': '*',
    //   },
    // }).then((res) => {
    //   setParks(res);
    // });
    axios.get('localhost:3000/yelp');
  });

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

// export default Map;
