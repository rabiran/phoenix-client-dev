import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => {
    return {
        updateLink:{
            cursor: 'pointer',
        },
        root: {
            backgroundColor: 'white',
            borderRadius: '100px',
            marginTop: '8px',
            width: '337px',
            paddingLeft: '12px',
            marginRight: '10px',
        },
        buttonBaseRoot: {
            color: 'white',
            backgroundImage: [`linear-gradient(to left, ${theme.palette.primary.dark}, ${theme.palette.primary.light})`],
            borderRadius: '100px',
            height: '33px',        
            padding: '0 27px',
            margin: '10px',
            boxShadow: '0px 0px 6px 1px rgba(140,140,140,0.64)',
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
            alignItems: 'baseline'
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
            minHeight: '83px',
        }
    };
});