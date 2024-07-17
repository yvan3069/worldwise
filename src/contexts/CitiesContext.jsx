import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import PropTypes from "prop-types";

const CityContext = createContext();

function CityProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: "",
  };
  function reducer(state, action) {
    switch (action.type) {
      case "isLoading":
        return { ...state, isLoading: true };
      case "cities/loaded":
        return { ...state, cities: action.payload, isLoading: false };
      case "city/loaded":
        return { ...state, currentCity: action.payload, isLoading: false };
      case "city/created":
        return {
          ...state,
          cities: [...state.cities, action.payload],
          isLoading: false,
        };
      case "city/deleted":
        return {
          ...state,
          isLoading: false,
          cities: state.cities.filter((city) => city.id !== action.payload),
        };
      case "error":
        return { ...state, error: action.payload, isLoading: false };
      default:
        throw new Error("Action not found");
    }
  }

  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const BASE_URL = "http://localhost:9000";

  useEffect(() => {
    async function fetchCities() {
      try {
        // setIsLoading(true);
        dispatch({ type: "isLoading" });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        // setCities(data);
        dispatch({ type: "cities/loaded", payload: data }); // dispatch action
      } catch {
        // console.log("there is an error when loading");
        dispatch({ type: "error", payload: "There is an error when loading" }); // dispatch action
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(async function getCity(id) {
    try {
      // setIsLoading(true);
      dispatch({ type: "isLoading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      // setCurrentCity(data);
      dispatch({ type: "city/loaded", payload: data }); // dispatch action
    } catch {
      // console.log("there is an error when loading");
      dispatch({ type: "error", payload: "There is an error when loading" }); // dispatch action
    }
  }, []);
  async function createCity(newCity) {
    try {
      // setIsLoading(true);
      dispatch({ type: "isLoading" });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      const data = await res.json();
      // setCities((cities) => [...cities, data]);
      dispatch({ type: "city/created", payload: data });
      // console.log(data);
    } catch {
      dispatch({ type: "error", payload: "there is error when creating city" });
    }
  }
  async function deleteCity(id) {
    try {
      // setIsLoading(true);
      dispatch({ type: "isLoading" });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
      // console.log(data);
    } catch {
      dispatch({ type: "error", payload: "there is error when deleting city" });
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}
CityProvider.propTypes = {
  children: PropTypes.node.isRequired, // Add children prop validation
};

function useCities() {
  const context = useContext(CityContext);
  return context;
}

export { useCities, CityProvider };
