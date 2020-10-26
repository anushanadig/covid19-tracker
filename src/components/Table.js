import React from "react";
import numeral from "numeral";

export default function Table({ countries }) {
  const sortedCountries = countries.sort((a, b) => b.cases - a.cases);
  return (
    <div className="table">
      {sortedCountries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>{numeral(cases).format("0,0")}</td>
        </tr>
      ))}
    </div>
  );
}
