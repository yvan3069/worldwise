import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const navigate = useNavigate();

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      <h1>map</h1>
      <h1>
        lat:{lat} lng:{lng}
      </h1>
      <button onClick={() => setSearchParams({ lat: 23, lng: 55 })}>
        Click here?
      </button>
    </div>
  );
}

export default Map;
