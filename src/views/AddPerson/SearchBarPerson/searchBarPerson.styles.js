import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => {
    return {
        errorMessageRoot: {
            position:'relative',
            top:'15px',
            marginLeft: '13px',
        },
        errorMessageSubtitle2: {
            fontWeight: "bold",
        },
        updateLink:{
            cursor: 'pointer',
        },
        root: {
            backgroundColor: 'white',
            borderRadius: '100px',
            marginTop: '11px',
            width: '337px',
            paddingLeft: '12px',
            marginRight: '10px',
        },
        titleLabel: {
            fontWeight: "bold",
        },
        personalNumberDetails: {
            fontWeight: "bold",
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            width: '208px',
            alignItems: 'baseline',
        },
        inputLabel: {
            fontWeight: 'unset',
            color: 'black',            
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
        searchBarContainer: {
            padding: '24px 24px 5px 24px',
            minHeight: '85px',
        }
    };
});