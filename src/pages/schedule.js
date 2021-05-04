import { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import Dates from "./date";
import { baseURL } from "./../endpoint.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
}));

const a11yProps = (index) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
};

function Schedule() {
  const [events, setEvents] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [dates, setDates] = useState([]);
  const classes = useStyles();
  const [loader, setLoader] = useState(true);
  const [value, setValue] = useState(0);

  const cleanData = (result) => {
    let dates = [];
    let eventsOnDates = {};
    result.forEach((item) => {
      let datetime = new Date(item.slot.start);
      let date = "";
      date +=
        datetime.getUTCDate() +
        "-" +
        (datetime.getUTCMonth() + 1) +
        "-" +
        datetime.getUTCFullYear();
      dates.push(date);

      if (date in eventsOnDates) {
        eventsOnDates[date].push(item);
      } else {
        eventsOnDates[date] = [item];
      }
    });
    setDates([...new Set(dates)].sort());
    setEvents(eventsOnDates);
    setLoader(false);
  };

  useEffect(() => {
    axios
      .get(baseURL + "/rooms/?format=json")
      .then((response) => {
        setRooms(response.data.results);
        getEvents();
      })
      .catch((e) => {
        console.log(e);
      });

    const getEvents = () => {
      axios
        .get(baseURL + "/talks/?format=json")
        .then((response) => {
          let results = response.data.results;
          axios
            .get(response.data.next)
            .then((response) => {
              results = results.concat(response.data.results);
              cleanData(results);
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    };
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      {loader ? (
        <CircularProgress className={classes.loader} />
      ) : (
        <Fragment>
          <div className="d-flex flex-row align-items-center justify-content-center">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              {dates.map((date, index) => {
                return <Tab label={date} {...a11yProps(index)} key={index} />;
              })}
            </Tabs>
          </div>
          <hr className="w-100" />
          {dates.map((date, index) => {
            return (
              <Dates
                value={value}
                index={index}
                rooms={rooms}
                events={events[date]}
                key={index}
              />
            );
          })}
        </Fragment>
      )}
    </div>
  );
}

export default Schedule;
