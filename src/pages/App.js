import { useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Schedule from "./schedule";
import Speakers from "./speakers";

function App() {
  const [showSchedule, setShowSchedule] = useState(true);

  return (
    <Container>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h1 className="m-3">DevCon</h1>
        <div className="d-flex flex-column align-items-center w-100 m-2">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <Button
              variant={showSchedule ? "contained" : "outlined"}
              color="primary"
              onClick={() => setShowSchedule(true)}
              className="m-2"
            >
              Schedule
            </Button>
            <Button
              variant={showSchedule ? "outlined" : "contained"}
              color="primary"
              onClick={() => setShowSchedule(false)}
              className="m-2"
            >
              Speakers
            </Button>
          </div>
          <div className="d-flex flex-column align-items-center w-100">
            {showSchedule ? <Schedule /> : <Speakers />}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default App;
