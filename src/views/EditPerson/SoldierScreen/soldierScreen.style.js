import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => {
    return {
        avatarRoot: {
            boxShadow: '0px 0px 36px 0px rgba(90,90,90,0.65)',
        },
        avatarContainer: {
            position: 'absolute',
            top: '-98px',
            right: '47px',
            zIndex: '3'
        },
        SearchBarPersonContainer: {
            position: 'relative',
            zIndex: '2',
            padding: '24px 24px 5px 24px',
            minHeight: '85px',
        },
        submitContainer: {
            display: 'flex',
            justifyContent: 'center'
        },
        titleSearchBar: {
            fontWeight: "bold",
        },
        containerSearch: {
            display: 'flex',
            alignItems: 'baseline'
        },
        errorMessageRoot: {
           /*  position:'relative',
            top:'15px', */
            marginLeft: '13px',
        },
        errorMessageSubtitle2: {
            fontWeight: "bold",
        },
        personalNumberDetails: {
            fontWeight: "bold",
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            // width: '208px',
            alignItems: 'baseline',
            '& > *': {
              marginLeft: '5px',
              marginRight: '5px',    
            }
        },
        inputLabel: {
            fontWeight: 'unset',
            color: 'black',            
        },
        updateLink:{
            cursor: 'pointer',
        },
    };
});