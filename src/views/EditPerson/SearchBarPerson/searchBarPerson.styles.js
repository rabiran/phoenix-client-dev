import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => {
    return {      
        root: {
            backgroundColor: 'white',
            borderRadius: '100px',
            marginTop: '11px',
            width: '337px',
            paddingLeft: '12px',
            marginRight: '10px',
        },
        containerSearch: {
            display: 'flex',
            alignItems: 'stretch'
        },
        SearchInput: {
            display: 'flex',
            flexDirection: 'column'
        },
        errorLabel: {
            color: "red",
            fontSize: "0.75em",
            marginLeft: "12px",
            fontWeight: "bold",
        },  
    };
});