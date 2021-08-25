import React from "react";
import { Pie } from "react-chartjs-2";
import "../App.css";

const Graph = (props) => {
  const options = {
    scale: {
      ticks: { beginAtZero: true },
    },
  };
  return (
    <div className="Graph-container">
      <Pie data={props.data} options={options} />
    </div>
  );
};

export default Graph;
