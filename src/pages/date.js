import { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Dates({ value, index, rooms, events }) {
  const classes = useStyles();
  const [items, setItems] = useState(null);

  useEffect(() => {
    let items = Object.keys(events).map((key) => events[key]);
    items = items.sort(
      (a, b) => new Date(a.slot.start) - new Date(b.slot.start)
    );
    setItems(items);
  }, [events]);
  if (!items) {
    return null;
  }
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
    >
      {value === index && (
        <Fragment>
        <div className="d-flex flex-row align-items-top mt-2 d-none d-lg-flex">
          {rooms.map((room) => {
            return (
              <div
                className="d-flex flex-column align-items-center w-100"
                key={room.name.en}
              >
                <Typography variant="h5" component="h2">
                  {room.name.en}
                </Typography>
                <hr className="w-100" />
                <div className="p-4">
                  {items.map((event) => {
                    if (event.slot.room.en === room.name.en) {
                      return (
                        <Link href={"/event/" + event.code} key={event.code}>
                          <Card className={classes.root + " m-3"}>
                            <CardContent>
                              <Typography variant="h5" component="h3">
                                {event.title}
                              </Typography>
                              <Typography
                                className={classes.title}
                                color="textSecondary"
                                gutterBottom
                              >
                                {event.speakers.map((speaker) => {
                                  if (event.speakers.length > 1) {
                                    return speaker.name + ", ";
                                  } else {
                                    return speaker.name;
                                  }
                                })}
                              </Typography>
                              <Typography variant="body2" component="p">
                                Start time:{" "}
                                {
                                  new Date(event.slot.start)
                                    .toTimeString()
                                    .split(" ")[0]
                                }
                              </Typography>
                              <Typography variant="body2" component="p">
                                Duration: {event.duration} min
                              </Typography>
                            </CardContent>
                          </Card>
                        </Link>
                      );
                    }
                    else{
                      return null;
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="d-sm-none">Testing</div>
        </Fragment>
      )}
    </div>
  );
}

export default Dates;
