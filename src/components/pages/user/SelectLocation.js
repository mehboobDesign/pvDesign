import React, { useRef } from "react";



import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";

const libraries = ['places'];

const SelectLocation = () => {

    const inputRef = useRef();
    let libRef = useRef(libraries)
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDGvl0xsp0pyya9Gi3FbR-p-Ojf4zYb-Xo",
        libraries: libRef.current,
    })

    //libraries: (process.env.REACT_APP_GOOGLE_LIBRARIES || '').split(','),

    console.log(isLoaded);

    const handlePlaceChanged = () => {
        const [place] = inputRef.current.getPlaces();

        if (place) {
            console.log(place.formatted_address);
            console.log(place.geometry.location.lat());
            console.log(place.geometry.location.lng());
        }
    };


    return (
        <>
            {isLoaded &&
                <StandaloneSearchBox
                    onLoad={ref => (inputRef.current = ref)}
                    onPlacesChanged={handlePlaceChanged}
                >
                    <input type="text" placeholder="Enter Location" />



                </StandaloneSearchBox>
            }
        </>
    );

}
export default SelectLocation;