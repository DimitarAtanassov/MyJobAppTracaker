// GoogleMapComp.js

import React , {useEffect} from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const contStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};
const apiKey = process.env.REACT_APP_API_KEY;

const GoogleMapComp = ({spotLocation}) => {
    useEffect(() => {
        const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
        console.log('API Key:', apiKey);
  }, []);
    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
                 
                mapContainerStyle={contStyle}
                center={spotLocation || center}
                zoom={10}
            >
                {spotLocation && <Marker position={spotLocation}/>}
            </GoogleMap>
        </LoadScript>
    );
};

export default GoogleMapComp;
