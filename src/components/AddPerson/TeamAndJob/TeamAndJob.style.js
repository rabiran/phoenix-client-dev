import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => {
    return {
        expansionPanelSummaryRoot: {
            height: '35px',
            minHeight: "unset",
            padding: '0px 12px',
            '&$expansionPanelSummaryExpanded': {
                minHeight: "unset",
                height: '37px',
                borderBottom: '3px solid rgb(252, 252, 252)'
            },
        },
        expansionPanelSummaryExpanded: {},
        expansionPanelContainer: {
            height: '90px',
            zIndex: '1',
        },
        expansionPanelRoot: {
            width: '48%',
            maxWidth: '540px',
            margin: '10px 0',
            boxShadow: 'unset',
            '&$expansionPanelExpanded': {
                margin: '10px 0',
            },
            '&:before': {
                content: 'unset'
            },
        },
        expansionPanelRounded: {            
            '&$expansionPanelExpanded, &$expansionPanelExpanded:last-child ': {
                borderBottomRightRadius: '0px',
                borderBottomLeftRadius: '0px',         
                boxShadow:'5px 7px 12px -5px rgba(36,28,28,0.3), 5px 7px 12px -5px rgba(36,28,28,0.3)'       
            },
            '&, &:last-child': {
                borderRadius: '17px'
            },
        },
        expansionPanelExpanded: {},
        expendDetails: {
            flexDirection: 'column',
            padding:'unset',            
        },
        expendIcon: {
            position: 'relative',
            top: '4px',
        },
        treeGroups: {
            height: '100px',
        },
        root: {
            backgroundColor: 'white',
            borderRadius: '100px',
            marginTop: '8px',
            width: '337px',
            paddingLeft: '12px',
            marginRight: '10px',
        },
        treeGroupsTitle: {
            display: 'flex',
            height: '35px',            
            padding: '0 13px',
            // backgroundColor: 'white',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: theme.palette.primary['300'],
            cursor: 'pointer',
            fontWeight: 'bold',
        },
        fakeSelected: {
            display: 'flex',
            width: '50%',
            maxWidth: '513px',
            height: '35px',
            margin: '10px 10px 10px 0',
            padding: '0 5px 0 13px',
            // borderRadius: '100px',
            borderRaduisTopLeft: '50',
            borderRaduisTopRight: '50',
            backgroundColor: 'white',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'darkgrey',
            cursor: 'pointer',
        },
        teamAndJobContainer: {
            display: 'flex',
            flexDirection: 'column',
            padding: '24px',
            minHeight: '83px',
        },
        descriptionContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: '66%',
            maxWidth: '777px',
        },
        'MuiTypography-colorTextSecondary': {
            color: 'black'
        },
        text: {
            color: 'black'
        }
    };
});