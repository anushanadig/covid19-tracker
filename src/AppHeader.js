import React, { useContext } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { CountryContext } from "./CountryContext";

function AppHeader({ countries }) {
  const { country, onCountryChange } = useContext(CountryContext);

  return (
    <header className="app__header">
      <h1>COVID-19 Tracker</h1>
      <FormControl>
        <Select
          value={country}
          onChange={(e) => onCountryChange(e.target.value)}
        >
          <MenuItem value="Worldwide">Worldwide</MenuItem>
          {countries.map((country) => (
            <MenuItem
              key={country.countryInfo.iso2}
              value={country.countryInfo.iso2}
            >
              {country.country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </header>
  );
}

export default AppHeader;
