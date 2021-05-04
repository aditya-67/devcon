import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Speaker from "./../components/speaker.js";
import { baseURL } from "./../endpoint.js";

const useStyles = makeStyles({
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

function Event() {
  const [eventDetails, setEventDetails] = useState(null);
  const [loader, setLoader] = useState(true);
  let { id } = useParams();

  useEffect(() => {
    axios
      .get(
        baseURL + "/talks/" + id + "/?format=json"
      )
      .then((response) => {
        setEventDetails(response.data);
        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  const classes = useStyles();

  return (
    <Container>
      {loader ? (
        <CircularProgress className={classes.loader} />
      ) : (
        <div className="d-flex flex-column align-items-center">
          <Card className={classes.root + " m-3 w-100 px-4"}>
            <CardContent>
              <Button href="/" variant="contained" primary className="mb-2">
                Go back
              </Button>
              <Typography variant="h5" component="h3" className="mb-3">
                <strong>{eventDetails.title}</strong>
              </Typography>
              <Typography variant="body2" component="p">
                Date: {new Date(eventDetails.slot.start).toDateString()}
              </Typography>
              <Typography variant="body2" component="p">
                Start time:{" "}
                {new Date(eventDetails.slot.start).toTimeString().split(" ")[0]}
              </Typography>
              <Typography variant="body2" component="p">
                Duration: {eventDetails.duration} min
              </Typography>
              <Typography variant="body2" component="p">
                Room: {eventDetails.slot.room.en}
              </Typography>

              <Typography variant="h5" component="h5" className="mt-3">
                {eventDetails.abstract}
              </Typography>
              <hr className="w-100" />

              <Typography variant="body2" component="p">
                {eventDetails.description}
              </Typography>

              <div className="d-flex flex-column align-items-start">
                {eventDetails.speakers.map((speaker) => {
                  return <Speaker speakerDetails={speaker} />;
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Container>
  );
}

export default Event;
