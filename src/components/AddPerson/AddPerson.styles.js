import { makeStyles } from "@material-ui/core/styles";
import bg from "../../assets/formes_background.jpg";

export default makeStyles(theme => ({
    /*   root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper
    }, */
    AddPerson: {
      backgroundImage: `url(${bg})`,
      height: "100%",
      width: "100%",
      position: "fixed",
      display: "flex",
      justifyContent: "center"
    },
    tabContent: {
      position: "relative",
      top: "120px",
      width: "60%",
      minWidth: "min-content"
    },
    tabPanel: {
      borderRadius: "10px 0 10px 10px",
      backgroundColor: "rgb(220, 222, 222)",     
    }
  }));