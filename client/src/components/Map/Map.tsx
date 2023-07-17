import { useEffect, useState } from "react";
import { Coordinates, MapProps } from "../../interfaces";
import "./Map.css";

import { GoogleMap, Marker } from "@react-google-maps/api";
import { DEFAULT_CENTER } from "../../constants";


export default function Map({
  markers,
  onMarkerClick,
  onMapClick,
  center,
}: MapProps) {
  const mapContainerStyle = {
    marginTop: "30px",
    width: "100%",
    height: "100%"
  };
  const [userLocation, setUserLocation] = useState<Coordinates>();
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error retrieving user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleMarkerClick = (marker: Coordinates) => {
    if (onMarkerClick) {
      onMarkerClick(marker);
    }
  };

  const renderMarkers = () => {
    if (!markers.length) {
      return;
    }
    return markers.map((position, key) => (
      <Marker
        key={key}
        position={position as google.maps.LatLngLiteral}
        onClick={() => handleMarkerClick(position)}
      />
    ));
  };
  let mapCenter: google.maps.LatLng | undefined;
  if (userLocation) {
    const { lat, lng } = userLocation;
    if (lat !== 0 && lng !== 0) {
      mapCenter = new google.maps.LatLng(lat, lng);
    }
  } else {
    mapCenter = new google.maps.LatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng);
  }
  return (
    <div  id="mapDiv" className='mainbodyforMap'>
      <div className='map'>
        <GoogleMap
          onClick={onMapClick}
          mapContainerStyle={mapContainerStyle}
          center={center || mapCenter}
          zoom={11}
        >
          {renderMarkers()}
        </GoogleMap>
      </div>
    </div>
  );
}
