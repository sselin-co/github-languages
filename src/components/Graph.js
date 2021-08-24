import React from "react";
import { Bar } from "react-chartjs-2";

const Graph = (props) => {
  //   let [state, setState] = useState(props.data);
  return (
    <div className="Graph-container">
      <Bar responsive="true" data={props.data} />
    </div>
  );
};

export default Graph;
