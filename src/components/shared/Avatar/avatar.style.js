import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
    iconColorPrimary:{
        color: theme.palette.background.paper
    }, 
    fontSizeLargeIcon: props => ({
        width: `${12/23 * props.size}px`,
        height: `${12/23 * props.size}px`,
    }),
    rootBadge: props => ({
        minWidth: `${5/23 * props.size}px`,
        minHeight: `${5/23 * props.size}px`,
        backgroundColor: `${theme.palette.primary[200]} !important`,
        borderRadius: '50px',
        padding: '0px',     
    }),
    root: props => ({
        width: `${props.size}px`,
        height: `${props.size}px`,        
        border: `4px solid ${props.borderColor}`,
        backgroundColor: !!props.uploadImage ? theme.palette.primary[400] : '#fffff4',
    }),
    altImage: props => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: `${16/23 * props.size}`,
        marginBottom: '7px',
        cursor: 'pointer'
    }),
    addPhotoIcon: props => ({
        fontSize: `${7/23 * props.size}px`
    }),
    uploadImageText: props => ({
        fontSize: `${4/23 * props.size}px`,
        letterSpacing: '-1px'
    }),
    linkGetPhoto: props => ({
        fontSize: `${2/23 * props.size}px`
    }),
})
)