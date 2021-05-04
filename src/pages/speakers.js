import { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Speaker from "./../components/speaker";
import { baseURL } from "./../endpoint.js";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
});

function Speakers() {
  const classes = useStyles();
  const [speakers, setSpeakers] = useState(null);
  const [loader, setLoader] = useState(true);

  const getSpeakers = () => {
    axios
      .get(baseURL + "/speakers/?format=json")
      .then((response) => {
        let results = response.data.results;
        axios
          .get(response.data.next)
          .then((response) => {
            results = results.concat(response.data.results);
            setSpeakers(results);
            setLoader(false);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getSpeakers();
  }, []);
  return (
    <div className={classes.root}>
      {loader && !speakers ? (
        <CircularProgress className={classes.loader} />
      ) : (
        <div className="d-flex flex-column align-items-center">
          <Card className={classes.root + " m-3 w-100 px-4"}>
            <CardContent>
              {speakers.map((speaker) => {
                return (
                  <Link href={"/speaker/" + speaker.code} key={speaker.code}>
                    <Speaker speakerDetails={speaker} />{" "}
                  </Link>
                );
              })}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Speakers;
