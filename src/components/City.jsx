import { useNavigate, useParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";
import styles from "./City.module.css";
import Spinner from "./Spinner";
import Button from "./Button";

// import styles from "./City.module.css";

// const formatDate = (date) =>
//   new Intl.DateTimeFormat("en", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//     weekday: "long",
//   }).format(new Date(date));

// function City() {
//   // TEMP DATA
//   const currentCity = {
//     cityName: "Lisbon",
//     emoji: "🇵🇹",
//     date: "2027-10-31T15:59:59.138Z",
//     notes: "My favorite city so far!",
//   };

//   const { cityName, emoji, date, notes } = currentCity;

function City() {
  const { cityId } = useParams();
  const { getCity, currentCity, isLoading } = useCities();
  const { cityName, emoji, notes, date } = currentCity;
  const navigate = useNavigate();

  useEffect(() => {
    getCity(cityId);
  }, [cityId]);
  if (isLoading) return <Spinner />;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>{cityName}</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{date || null}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          back
        </Button>
      </div>
    </div>
  );
}

export default City;
