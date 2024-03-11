import React from 'react';
import GoogleMapComp from '../components/GoogleMapComp';
const spotLocation = { lat: 40.7128, lng: -74.006 };
const HomePage = () => {
    return (
        <>
            <h1>Find a spot</h1>
            <GoogleMapComp spotLocation={spotLocation} />
        </>
    )
}

export default HomePage