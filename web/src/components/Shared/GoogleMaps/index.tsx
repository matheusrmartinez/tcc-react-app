import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

import React from "react";

const GoogleMaps: React.FC = () => {
  const latitude = localStorage.getItem('latitude') ?? -23.385719;
  const longitude = localStorage.getItem('longitude') ?? -47.640295;

  setTimeout(function() {
    localStorage.removeItem('latitude');
    localStorage.removeItem('longitude');
  }, 5000);

  const MapWithAMarker = withScriptjs(withGoogleMap((props: any) =>
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: Number(latitude), lng: Number(longitude) }}
    >
      <Marker
        position={{ lat: Number(latitude), lng: Number(longitude) }}
      />
    </GoogleMap>
  ));

  return (
    <div>
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGygXOcGdHQFvL0SuGGCc3Mm207UGKct4&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `200%` }} />}
      />
    </div>
  );
};

export default GoogleMaps;
