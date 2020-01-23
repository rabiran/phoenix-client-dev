import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => {
    return {
        teamAndJobContainer: {
            display: 'flex',
            flexDirection: 'column',
            padding: '24px',
            minHeight: '83px',
        },
        descriptionContainer:{
            display: 'flex',
            flexDirection: 'column',           
        },       
        'MuiTypography-colorTextSecondary': {
            color: 'black'
        },
        text: {
            color: 'black'
        }
    };
});