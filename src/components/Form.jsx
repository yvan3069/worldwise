// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hook/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import DatePicker from "react-datepicker";
import { useCities } from "../contexts/CitiesContext";

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const [flagEmoji, setflagEmoji] = useState("");
  const [geoEmptyError, setGeoEmptyError] = useState("");
  const { position: mapPosition } = useUrlPosition();
  const [mapLat, mapLng] = mapPosition;
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const newCity = {
      cityName,
      country,
      emoji: flagEmoji,
      date,
      notes,
      position: { lat: mapLat, lng: mapLng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }

  useEffect(
    function () {
      if (!mapLat && !mapLng) return;
      async function fetchCityData() {
        try {
          setIsGeoLoading(true);
          setGeoEmptyError("");
          const tempUrl = `${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`;
          const res = await fetch(tempUrl);
          const data = await res.json();
          // console.log(data);
          if (data.continent === "")
            throw new Error("It seems there is no country there.");

          setCityName(data.city || data.counrtyName || data.continent);
          setflagEmoji(getFlagEmoji(data.countryCode));
          setCountry(data.counrtyName || data.continent);
        } catch (err) {
          setGeoEmptyError(err.message);
        } finally {
          setIsGeoLoading(false);
        }
      }
      fetchCityData();
    },
    [mapLat, mapLng]
  );

  if (isGeoLoading) return <Spinner />;
  if (geoEmptyError) return <Message message={geoEmptyError} />;
  if (!mapLat && !mapLng)
    return <Message message="Start by clicking the map first" />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles["loading"] : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{flagEmoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          selected={date}
          onSelect={(date) => setDate(date)}
          dateFormat="yyyy/MM/dd"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
