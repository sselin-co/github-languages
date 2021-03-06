import FieldEntry from "./FieldEntry";
import Graph from "./Graph";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

// Converts UNIX Epoch time to 12hr time. Useful for displaying API reset timestamps.
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

// Parent component for the user input field and graph. Mediates data transfer between siblings.
function Container() {
  // State hook storing the state of the graph.
  const [state, setState] = useState(placeHolder);
  // State hook controlling if loading indicator is displayed.
  const [loading, setLoading] = useState(false);
  // Consumes API response and throws an error if a bad status code is received.
  const checkErrors = (response) => {
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      setLoading(false);
      throw new Error(message);
    }
  };
  // Takes in a username as input and returns an object with the languages 
  const getData = async (username) => {
    setLoading(true);
    const ratesResponse = await fetch("https://api.github.com/rate_limit", {
      Accept: "application/vnd.github.v3+json",
    });
    checkErrors(ratesResponse);
    const rates = await ratesResponse.json();
    console.log(
      `Data rate remaining: ${rates.rate.remaining} \n`,
      `Rate will reset at: ${formatTimestamp(rates.rate.reset)}`
    );
    if (rates.rate.remaining === 0) {
      setLoading(false);
      return alert(
        `GitHub API rate limit exceeded. Please wait till ${formatTimestamp(
          rates.rate.reset
        )} to try again, or login with your GitHub account to increase your rate limit.`
      );
    }
    const repoResponse = await fetch(
      `https://api.github.com/users/${username}/repos`,
      {
        Accept: "application/vnd.github.v3+json",
      }
    );
    checkErrors(repoResponse);
    const repos = await repoResponse.json();
    if (repos.length === 0) {
      setLoading(false);
      return alert(
        "No repositories with detectable languages were found for this username."
      );
    }
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
    setLoading(false);
    return dataList;
  };
  //
  let placeHolder = {
    labels: ["JavaScript", "Python", "Java", "Perl", "Vue", "SQL"],
    datasets: [
      {
        label: "# of bytes written in a language",
        data: [36314, 25975, 58461, 4543, 12345, 8000],
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
  let data = {
    labels: [],
    datasets: [
      {
        label: "# of bytes written in a language",
        data: [],
        backgroundColor: [
          "rgba(245, 122, 151, 0.2)",
          "rgba(110, 148, 245, 0.2)",
          "rgba(245, 173, 135, 0.2)",
          "rgba(135, 245, 151, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(245, 217, 147, 0.2)",
          "rgba(280, 90, 151, 0.2)",
          "rgba(50, 148, 245, 0.2)",
          "rgba(245, 200, 90, 0.2)",
          "rgba(90, 230, 151, 0.2)",
          "rgba(180, 102, 255, 0.2)",
          "rgba(245, 200, 110, 0.2)",
        ],
        borderColor: [
          "rgba(245, 122, 151, 1)",
          "rgba(110, 148, 245, 1)",
          "rgba(245, 173, 135, 1)",
          "rgba(135, 245, 151, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(245, 217, 147, 1)",
          "rgba(280, 90, 151, 1)",
          "rgba(50, 148, 245, 1)",
          "rgba(245, 200, 90, 1)",
          "rgba(90, 230, 151, 1)",
          "rgba(180, 102, 255, 1)",
          "rgba(245, 200, 110, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

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

  const testCallback = () => {
    setState(placeHolder);
  };
  return (
    <div>
      <div className="App-body">
        <Graph data={state} />
        <FieldEntry isLoading={loading} passToContainer={fieldEntryCallback} />
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
