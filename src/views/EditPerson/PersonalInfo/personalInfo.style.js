import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => {
    return {
        rootFormControl: ({ showOnly, mainPage }) => ({

            marginBottom: showOnly || mainPage ? null : '4px',
            marginTop: showOnly || mainPage ? null : '4px',
            height: showOnly || mainPage ? null : '40px',
        }),
        input: {
            "&:-webkit-autofill": {
                WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.secondary} inset`
            },
            '&$disabled': {
                color: theme.palette.text.primary,
            },
        },
        disabled: {},
        prsnlinfSubContainer: {
            display: 'flex',
            flexDirection: 'column',
            minWidth: '246px',
            maxWidth: '246px',
            margin: '15px',
        },
        prsnlinfContainer: ({mainPage}) => ({
            position: 'relative',
            display: 'flex',
            flexFlow: 'row',
            justifyContent: mainPage ? 'flex-start' : 'space-evenly',
            backgroundColor: theme.palette.background.secondary,
            padding: '24px',
            '&:before': {
                position: 'absolute',
                top: mainPage ? 90 : -21,
                left: mainPage ? 0 : 63,
                content: '" "',
                height: 27,
                width: 27,
                background: theme.palette.background.primary,
                transformOrigin: '0% 0%',
                transform: 'rotate(45deg)',
                zIndex: 1,
            },
        }),
        [`@media (max-width: 1224px)`]: {
            prsnlinfContainer: () => ({
                display: 'flex',
                flexFlow: 'row wrap',
            }),
            hiddenDivider: {
                display: 'none',
            },
        },
        prsnlinfAddressContainer: {
            display: 'flex',
            flexDirection: 'row'
        },
        divider: ({showOnly, mainPage}) => ({
            borderLeft: '1px dashed grey',
            margin: '0 10px',
            height: showOnly || mainPage ? '147px' : '192px',
        }),
        adormentRootFirstColumn: {
            width: '128px',
        },
        adormentRootSecondColumn: {
            width: '49px',
        },
        adormentRootThirdColumn: {
            width: '58px',
        },
    }
});