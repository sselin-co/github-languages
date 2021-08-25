import React from "react";
import { Bar } from "react-chartjs-2";
// import "../App.css";

const Graph = (props) => {
  //   let [state, setState] = useState(props.data);
  return (
    <div className="Graph-container">
      <Bar data={props.data} />
    </div>
  );
};

export default Graph;
