import { ButtonBase } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

export default withStyles((theme) => ({
  root: {
    color: "white",
    backgroundImage: [
      `linear-gradient(to left, ${theme.palette.primary.dark}, ${theme.palette.primary.light})`
    ],
    borderRadius: "100px",
    height: "33px",
    padding: "0 27px",
    margin: "10px",
    boxShadow: "0px 0px 6px 1px rgba(140,140,140,0.64)"
  }
}))(ButtonBase);
