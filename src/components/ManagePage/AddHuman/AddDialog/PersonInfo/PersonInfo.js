import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../../../../theme.js';
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles({
    info: {
        backgroundColor: fade(theme.palette.primary.main, 0.2),
        marginTop: '20px',
        padding: '10px'
    },
    txt: {
        margin: '10px',
    },
    bold: {
        fontWeight: 'bold',
        textDecoration: 'underline'
    }
});

/**
 * Gets person, and renders his values with the keys
 * @param {object} props.person
 */
export default function PersonInfo(props) {
    const classes = useStyles();

    const something = [
        { label: "שם מלא", value: props.person.fullName },
        { label: "מספר אישי", value: props.person.personalNumber || "אין" },
        { label: "יחידה", value: props.person.currrentUnit || "אין" },
        { label: "טלפון", value: props.person.mobilePhone || "אין" },
        { label: "דרגה", value: props.person.rank || "אין" },
    ]
    let values = [];

    values = something.map((obj, index) =>  <div key={index} className={classes.txt}>
         <span className={classes.bold}>{`${obj.label}:`}</span><span>{`  ${obj.value}`}</span></div> );

    return (
        <div className={classes.info}>
            {values}
        </div>
    );
}

