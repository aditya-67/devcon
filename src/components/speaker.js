import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  avatar: { width: "15%" },
});

function Speaker({ speakerDetails }) {
  const classes = useStyles();
  let avatar =
    "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";

  return (
    <div className="d-flex flex-column align-items-center">
      <hr className="w-100" />
      <div className="d-flex flex-row align-items-center">
        <img
          src={speakerDetails.avatar ? speakerDetails.avatar : avatar}
          className={classes.avatar}
          alt="avatar"
        />
        <div className="d-flex flex-column align-items-start">
          <Typography variant="h5" component="h3" className="mb-3">
            <strong>{speakerDetails.name}</strong>
          </Typography>
          <Typography variant="body2" component="p">
            {speakerDetails.biography}
          </Typography>
        </div>
      </div>
      <hr className="w-100" />
    </div>
  );
}

export default Speaker;
