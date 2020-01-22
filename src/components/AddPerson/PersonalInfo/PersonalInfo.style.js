import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => {
    return {
        prsnlinfSubContainer: {
            display: 'flex',
            flexDirection: 'column',            
            minWidth: '169px',
            maxWidth: '290px',
            margin: '0px 15px',
        },
        prsnlinfContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            backgroundColor: 'rgb(199, 216, 216)',
            padding: '24px',
            '&:before': {
                position: 'absolute',
                top: 139,
                left: 63,
                content: '" "',
                height: 27,
                width: 27,
                background: 'rgb(220, 222, 222)',
                transformOrigin: '0% 0%',
                transform: 'rotate(45deg)',
                zIndex: 1,
              },
        },
        prsnlinfAddressContainer: {
            display: 'flex',
            flexDirection: 'row'
        },
        divider: {
            borderLeft: '1px dashed grey',
            margin: '0 10px',
            height:'110px',
        },
        prsnlinfsabatContainer : {              
            minWidth: '246px',
            maxWidth: '246px',       
        },
    }
});