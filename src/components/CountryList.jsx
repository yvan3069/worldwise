import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

//去重countries,需要修改
// const countries = cities.reduce((acc, city) => {
//   if (!acc.includes(city.country)) {
//     acc.push(city.country);
//   }
//   return acc;
// }, []);

function CountryList() {
  const { isLoading, cities } = useCities();

  if (isLoading) return <Spinner />;

  if (cities.length === 0) return <Message message="No cities found" />;

  return (
    <ul className={styles.countryList}>
      {cities.map((city) => (
        <CountryItem country={city} key={city.id} />
      ))}
    </ul>
  );
}

CountryList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  cities: PropTypes.array.isRequired,
};

export default CountryList;
