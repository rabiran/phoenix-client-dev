
import React from 'react';
import { lightTheme, darkTheme } from 'theme.js';
import { MuiThemeProvider } from '@material-ui/core/styles';
import ThemeContext from './ThemeContext';
import { GlobalStyles } from "./GlobalStyles.js";
import CssBaseline from "@material-ui/core/CssBaseline";

export default function ThemeSwitch(props) {
    const [isDark, setIsDark] = React.useState(false);

    const themeSwitch = () => {
        setIsDark(!isDark);
    };

    const contextValue = {
        themeSwitch: themeSwitch
    }


    return (
        <ThemeContext.Provider value={contextValue}>
            
            <MuiThemeProvider theme={isDark ? darkTheme : lightTheme}>
                <CssBaseline />
                {props.children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
}
