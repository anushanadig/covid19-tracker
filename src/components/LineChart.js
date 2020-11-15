import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import covidAPI from "../api/covidAPI";
import numeral from "numeral";

// const options = {
//   legend: {
//     display: false,
//   },
//   elements: {
//     point: {
//       radius: 2,
//     },
//   },
//   tooltip: {
//     mode: "index",
//     intersect: true,
//     callbacks: {
//       label: function (tooltipItem, data) {
//         return tooltipItem.value;
//       },
//     },
//   },
//   scales: {
//     xAxes: [
//       {
//         display: true,
//       },
//     ],
//     yAxes: [
//       {
//         display: true,
//       },
//     ],
//   },
// };

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

export default function LineChart({ caseType = "cases" }) {
  const [data, setData] = useState([]);

  const buildChartData = (data, caseType) => {
    let dataPoints = [];
    let lastDatapoint;
    for (let date in data[caseType]) {
      if (lastDatapoint) {
        const dataPoint = {
          x: date,
          y: data[caseType][date] - lastDatapoint,
        };
        dataPoints.push(dataPoint);
      }
      lastDatapoint = data[caseType][date];
    }
    return dataPoints;
  };

  useEffect(() => {
    const getHistoricalData = async () => {
      const response = await covidAPI.get("historical/all");
      setData(buildChartData(response.data, caseType));
    };
    getHistoricalData();
  }, [caseType]);

  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                borderColor: "#171312",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}
