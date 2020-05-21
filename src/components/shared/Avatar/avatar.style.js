import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
    iconColorPrimary:{
        color: theme.palette.background.paper
    },
    bgColorDefaultAvater: {
        backgroundColor: '#fffff4',
    },
    bgColorRoot: {
        backgroundColor: theme.palette.primary[400],
    },   
    fontSizeLargeIcon: props => ({
        width: `${theme.spacing(12) * props.size}px`,
        height: `${theme.spacing(12) * props.size}px`,
    }),
    rootBadge: props => ({
        minWidth: `${theme.spacing(5) * props.size}px`,
        minHeight: `${theme.spacing(5) * props.size}px`,
        backgroundColor: `${theme.palette.primary[200]} !important`,
        borderRadius: '50px',
        padding: '0px',     
    }),
    root: props => ({
        width: `${theme.spacing(23) * props.size}px`,
        height: `${theme.spacing(23) * props.size}px`,        
        border: `4px solid ${props.borderColor}`,
    }),
    altImage: props => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: `${theme.spacing(16) * props.size}`,
        marginBottom: '7px',
        cursor: 'pointer'
    }),
    addPhotoIcon: props => ({
        fontSize: `${theme.spacing(7) * props.size}px`
    }),
    uploadImageText: props => ({
        fontSize: `${theme.spacing(4) * props.size}px`,
        letterSpacing: '-1px'
    }),
    linkGetPhoto: props => ({
        fontSize: `${theme.spacing(2) * props.size}px`
    }),
})
)