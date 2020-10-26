import React, { useContext } from "react";
import { Map as Leafletmap, TileLayer } from "react-leaflet";
import { CountryContext } from "../CountryContext";
import { showDataOnMap } from "../Util";

export default function Map({ countries, caseType }) {
  const { mapCenter, mapZoom } = useContext(CountryContext);
  return (
    <div className="map">
      <Leafletmap center={mapCenter} zoom={mapZoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries, caseType)}
      </Leafletmap>
    </div>
  );
}
