import { makeStyles } from "@material-ui/core/styles";
import bg from "../../assets/formes_background.jpg";

export default makeStyles(theme => ({  
  background: {
    background: `url(${bg}) no-repeat center center fixed`,
    top: '0px',
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    position: 'fixed',
  },
  AddPerson: {    
    height: "100%",
    width: "100%",    
    display: "flex",
    justifyContent: "center"
  },
  tabContent: {
    position: "relative",
    top: "66px",
    width: "60%",
    minWidth: "min-content"
  },
  tabPanel: {
    borderRadius: "10px 0 10px 10px",
    backgroundColor: "rgb(220, 222, 222)",
    padding: '24px 0px'
  }
}));