
import { GoogleMap,useJsApiLoader } from "@react-google-maps/api"
import { useCallback, useState } from "react";


const containerStyle = {
    width: '400px',
    height: '400px'
  };

  // const center = {
  //   lat: -3.745,
  //   lng: -38.523
  // };


const Map = ({geoLocation}) => {
    console.log(geoLocation)

    const center = {
      lat: parseInt(geoLocation?.lat),
      lng: parseInt(geoLocation?.lng)
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
      })
    
      const [map, setMap] =useState(null)
    
      const onLoad = useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
    
        setMap(map)
      }, [])
    
      const onUnmount = useCallback(function callback(map) {
        setMap(null)
      }, [])
    

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      { /* Child components, such as markers, info windows, etc. */ }
      <></>
    </GoogleMap>
    
) : <></>
}

export default Map