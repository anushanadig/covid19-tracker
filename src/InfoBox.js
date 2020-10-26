import React, { useContext } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CountryContext } from "./CountryContext";
import "./styles/InfoBox.css";
import { prettyPrintStat } from "./Util";

export default function InfoBox({ title, type, isActive, ...props }) {
  const { countryInfo } = useContext(CountryContext);
  return (
    <Card
      className={`infoBox ${isActive && "infoBox--selected"}`}
      onClick={props.onClick}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="h2">
          {prettyPrintStat(countryInfo[`today${type}`])}
        </Typography>

        <Typography variant="body2" component="p">
          {`${prettyPrintStat(countryInfo[type.toLocaleLowerCase()])} in total`}
        </Typography>
      </CardContent>
    </Card>
  );
}
