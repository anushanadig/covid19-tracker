import React, { createContext, useState, useEffect } from "react";
import covidAPI from "./api/covidAPI";

export const CountryContext = createContext({});

export default function CountryConetxtProvider(props) {
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [mapCenter, setMapCenter] = useState({
    lat: 34.80746,
    lng: -40.4796,
  });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    const getWorldwideInfo = async () => {
      const response = await covidAPI.get("all");
      console.log(response.data);
      setCountryInfo(response.data);
    };
    getWorldwideInfo();
  }, []);

  const onCountryChange = async (countryCode) => {
    setCountry(countryCode);
    const url =
      countryCode === "Worldwide" ? "all" : `countries/${countryCode}`;
    const response = await covidAPI.get(url);
    console.log(response.data);
    setCountryInfo(response.data);
    setMapCenter({
      lat: response.data.countryInfo.lat,
      lng: response.data.countryInfo.long,
    });
    setMapZoom(4);
  };

  return (
    <CountryContext.Provider
      value={{ country, onCountryChange, countryInfo, mapCenter, mapZoom }}
    >
      {props.children}
    </CountryContext.Provider>
  );
}
