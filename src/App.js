import React, { useEffect, useState } from "react";
import "./App.css";
import AppHeader from "./AppHeader";
import CountryConetxtProvider from "./CountryContext";
import InfoBox from "./InfoBox";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import covidAPI from "./api/covidAPI";
import Table from "./components/Table";
import LineChart from "./components/LineChart";
import Map from "./components/Map";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [caseType, setCaseType] = useState("cases");

  useEffect(() => {
    const getCountries = async () => {
      const response = await covidAPI.get("countries");
      setCountries(response.data);
    };
    getCountries();
  }, []);
  return (
    <CountryConetxtProvider>
      <div className="app">
        <div className="app__left">
          <AppHeader countries={countries} />

          <div className="app__stats">
            <InfoBox
              title="Cases"
              type="Cases"
              isActive={caseType === "cases"}
              onClick={(e) => setCaseType("cases")}
            />
            <InfoBox
              title="Recovered"
              type="Recovered"
              isActive={caseType === "recovered"}
              onClick={(e) => setCaseType("recovered")}
            />
            <InfoBox
              title="Deaths"
              type="Deaths"
              isActive={caseType === "deaths"}
              onClick={(e) => setCaseType("deaths")}
            />
          </div>
          <div>
            <Map countries={countries} caseType={caseType} />
          </div>
        </div>
        <Card className="app__right">
          <CardContent>
            <h1>Live cases by country</h1>
            <Table countries={countries} />
            <h1>{`World wide new ${caseType}`}</h1>
            <LineChart caseType={caseType} />
          </CardContent>
        </Card>
      </div>
    </CountryConetxtProvider>
  );
}

export default App;
