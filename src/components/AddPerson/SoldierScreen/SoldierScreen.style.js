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
        submitContainer: {
            display: 'flex',
            justifyContent: 'center'
        },
    };
});