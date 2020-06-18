import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => {
    return {
        rootFormControl: ({ showOnly, mainPage }) => ({

            marginBottom: showOnly || mainPage ? 'none' : '4px',
            marginTop: showOnly || mainPage ? 'none' : '4px',
            height: showOnly || mainPage ? 'none' : '40px',
        }),
        input: {
            "&:-webkit-autofill": {
                WebkitBoxShadow: '0 0 0 1000px rgb(199, 216, 216) inset'
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
            backgroundColor: 'rgb(199, 216, 216)',
            padding: '24px',
            '&:before': {
                position: 'absolute',
                top: mainPage ? 90 : -21,
                left: mainPage ? 0 : 63,
                content: '" "',
                height: 27,
                width: 27,
                background: 'rgb(220, 222, 222)',
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