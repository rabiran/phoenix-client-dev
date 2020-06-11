import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => {
    return {    
        submitContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',          
        },
        errorMessageSubtitle2: {
            fontWeight: "bold",
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    };
});