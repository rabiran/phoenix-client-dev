import { makeStyles } from "@material-ui/core/styles";
import Board from "../../../assets/images/board1.png";

export default makeStyles(theme => {
    return {
        divider: {
            border: '1.4px solid darkgrey',
            width: '17px',
        },
        DialogContainer: {
            padding: '58px',
        },
        messageContainer: {
            background: `url(${Board})`,        
            width: '607px',
            height: '376px',
            backgroundSize: 'auto',                        
            backgroundRepeat: 'no-repeat',         
        },
        letter: {
            display: 'flex',
            justifyContent: 'center',           
        },
        dialogTitle: {                    
            margin: '10px',
        },
        typographyFontWeight:{
            fontWeight: "bold",
        },
        dialogAction: {
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '27px',
        },
        linkColor: {
            color: theme.palette.link.dialog,
        },      
    };
});