import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import PropTypes from "prop-types";
import { useGeolocation } from "../hook/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hook/useUrlPosition";

function Map() {
  const { position } = useUrlPosition();
  const [mapLat, mapLng] = position;
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingPostion,
    position: geolocation,
    getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );
  useEffect(
    function () {
      if (geolocation) setMapPosition([geolocation.lat, geolocation.lng]);
    },
    [geolocation]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocation && (
        <Button onClick={getPosition} type="position">
          {isLoadingPostion ? "Loading" : "Postion"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup onClick={() => {}}>
                <span>{city.emoji}</span> <span>{city.notes}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <DetectPosition />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectPosition() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      // console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

ChangeCenter.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Map;
