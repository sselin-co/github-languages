import FieldEntry from "./FieldEntry";
import Graph from "./Graph";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const formatTimestamp = (timeStamp) => {
  let date = new Date(timeStamp * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();
  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }

  tConvert("18:00:00");
  return tConvert(hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2));
};

const checkErrors = (response) => {
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
};

const getData = async (username) => {
  const ratesResponse = await fetch("https://api.github.com/rate_limit", {
    Accept: "application/vnd.github.v3+json",
  });
  checkErrors(ratesResponse);
  const rates = await ratesResponse.json();
  console.log(
    `Data rate remaining: ${rates.rate.remaining} \n`,
    `Rate will reset at: ${formatTimestamp(rates.rate.reset)}`
  );
  if (rates.rate.remaining === 0)
    return alert(
      `GitHub API rate limit exceeded. Please wait till ${formatTimestamp(
        rates.rate.reset
      )} to try again, or login with your GitHub account to increase your rate limit.`
    );
  const repoResponse = await fetch(
    `https://api.github.com/users/${username}/repos`,
    {
      Accept: "application/vnd.github.v3+json",
    }
  );
  checkErrors(repoResponse);
  const repos = await repoResponse.json();
  if (repos.length === 0)
    return alert(
      "No repositories with detectable languages were found for this username."
    );
  let repoList = [];
  for (let repo of repos) {
    let langUrl = repo.languages_url;
    let response = await fetch(langUrl, {
      Accept: "application/vnd.github.v3+json",
    });
    checkErrors(response);
    response = await response.json();
    repoList.push(response);
  }
  let dataList = {};
  for (let repo of repoList) {
    if (repo.length > 0) continue;
    else
      for (const [key, value] of Object.entries(repo)) {
        if (dataList[key] !== undefined) {
          dataList[key] = dataList[key] + value;
        } else dataList[key] = value;
      }
  }
  return dataList;
};

function Container() {
  //   let testData = {
  //     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  //     datasets: [
  //       {
  //         label: "# of Votes",
  //         data: [12, 19, 3, 5, 2, 3],
  //         backgroundColor: [
  //           "rgba(245, 122, 151, 0.2)",
  //           "rgba(110, 148, 245, 0.2)",
  //           "rgba(245, 173, 135, 0.2)",
  //           "rgba(135, 245, 151, 0.2)",
  //           "rgba(153, 102, 255, 0.2)",
  //           "rgba(245, 217, 147, 0.2)",
  //         ],
  //         borderColor: [
  //           "rgba(245, 122, 151, 1)",
  //           "rgba(110, 148, 245, 1)",
  //           "rgba(245, 173, 135, 1)",
  //           "rgba(135, 245, 151, 1)",
  //           "rgba(153, 102, 255, 1)",
  //           "rgba(245, 217, 147, 1)",
  //         ],
  //         borderWidth: 1,
  //       },
  //     ],
  //   };
  let data = {
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: [
          "rgba(245, 122, 151, 0.2)",
          "rgba(110, 148, 245, 0.2)",
          "rgba(245, 173, 135, 0.2)",
          "rgba(135, 245, 151, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(245, 217, 147, 0.2)",
        ],
        borderColor: [
          "rgba(245, 122, 151, 1)",
          "rgba(110, 148, 245, 1)",
          "rgba(245, 173, 135, 1)",
          "rgba(135, 245, 151, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(245, 217, 147, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const [state, setState] = useState([]);
  //   let [entry, setEntry] = useState("");
  const fieldEntryCallback = (entry) => {
    getData(entry)
      .then((results) => {
        let keys = Object.keys(results);
        let values = Object.values(results);
        data.labels = keys;
        // data.datasets[0].label = "Repository Programming Languages";
        data.datasets[0].data = values;
        // console.log(data.datasets.data);
        // console.log(testData);
        setState(data);
      })
      .catch((error) => error.message);
  };
  return (
    <div>
      <div className="App-body">
        <Graph data={state} />
        <FieldEntry passToContainer={fieldEntryCallback} />
        {/* <form action="https://github.com/login/oauth/authorize" method="get">
          <input type="submit">Login with GitHub</input>
        </form> */}
        {/* <Form>
          <Button type="submit">Login with GitHub</Button>
        </Form> */}
      </div>
    </div>
  );
}

export default Container;
