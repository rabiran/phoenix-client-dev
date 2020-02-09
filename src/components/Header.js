import React from 'react';
import '../App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function Header() {

    return (
        <div className='header-root'>
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" className='header-title'>
                        Phoenix
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
