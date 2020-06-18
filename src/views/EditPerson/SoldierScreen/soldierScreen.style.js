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
        submitContainer: {
            display: 'flex',
            justifyContent: 'center'
        },
    };
});