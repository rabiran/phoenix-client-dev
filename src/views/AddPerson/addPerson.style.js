import { makeStyles } from "@material-ui/core/styles";
import bg from "../../assets/formes_background.jpg";

export const styles = makeStyles(theme => ({
  background: {
    background: `url(${bg}) no-repeat center center fixed`,
    top: '0px',
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    position: 'fixed',
  },
  AddPerson: {
    marginTop: '64px', 
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  tabContent: {
    width: '60%',
    position: "relative",
    top: "66px",
    minWidth: "min-content"
  },
  tabPanel: {
    position: 'relative',
    borderRadius: "10px 10px 10px 10px",
    backgroundColor: "rgb(220, 222, 222)",
    padding: '24px 0px',
    boxShadow: '0px 0px 13px 11px #0e0e0e2e',
    minHeight: '609px',
    minWidth: '717px',
  },
  tabsRoot: {
    position: 'relative',
    top: '25px',
  },
  tabsIndicator: {
    display: 'none',
  },
}));

export const tabItemStyles = makeStyles(theme => ({
  root: {
    marginRight: `${theme.spacing(1.7)}px`,
    backgroundColor: "rgb(220, 222, 222)",
    borderRadius: '5px 5px 0px 0px',
    minWidth: '102px',
    minHeight: '78px',
    opacity: 1,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    transition: '0.2s',
    letterSpacing: '0px',
    fontSize: '30px',
    fontWeight: 'bold',
  },
  selected: {
    color: theme.palette.primary.main,
    zIndex: '2',
  },
  wrapper: {
    zIndex: 2,
    lineHeight: 'initial',
    textTransform: 'initial',
    position: 'relative',
    bottom: '11px',
  },
}));