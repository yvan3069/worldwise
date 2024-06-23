import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function CityList() {
  const { isLoading, cities } = useCities();
  if (isLoading) return <Spinner />;
  // console.log(cities);

  if (cities.length === 0) return <Message message="No cities found" />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

CityList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  cities: PropTypes.array.isRequired,
};

export default CityList;
