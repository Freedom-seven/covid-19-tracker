import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";

// https://disease.sh/v3/covid-19/countries

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            flag: country.countryInfo.flag,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app__header">
        <div className="app__logoContainer">
          <img
            className="app__logoImg"
            src="https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png"
            alt="logo"
          />
          <h1 className="app__logo">COVID-19 TRACKER</h1>
        </div>

        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="Worldwide">Worldwide 🗺</MenuItem>
            {countries.map((country, index) => (
              <MenuItem value={country.value} key={index}>
                {country.flag && (
                  <img
                    className="app__countryFlag"
                    src={country.flag}
                    alt="flag"
                  />
                )}
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="app__stats">
        <InfoBox title="Coronavirus Cases" cases={1234} total={1234} />
        <InfoBox title="Recovered" cases={12345} total={12345} />
        <InfoBox title="Deaths" cases={12346} total={12346} />
      </div>
      <Map />
    </div>
  );
}

export default App;
