import React from 'react';
import { theme } from '../../../../theme.js';
import '../../../../App.css'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Ctrlk from '../../../Stuff/Ctrlk';
import PersonInfo from './PersonInfo/PersonInfo';
import HierarchyField from './HierarchyField/HierarchyField';
import HierarchySuggest from './HierarchyField/HierarchySuggest';
import Grow from '@material-ui/core/Grow';
import { fade } from '@material-ui/core/styles/colorManipulator';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow timeout={2000} ref={ref} {...props} />;
});

const useStyles = makeStyles({
    dialog: {
        minHeight: '50%',
        height: '75%',
        minWidth: '400px',
        width: '50%',
    },
    title: {
        display:'flex',
        justifyContent:'center',
        backgroundColor: fade(theme.palette.primary.main, 0.2),
    },
    input: {
        '& div':{
            zIndex: '9999 !important'
        }
    },
    actions: {
        display: 'flex',
        justifyContent: 'center'
    },
});

/**
 * Gets open value, dialogDone and dialogClose methods and table type, renders the dialog it self open.
 * @param {boolean} props.open
 * @param {function} props.dialogDone({id,hierarchy}) 
 * @param {function} props.dialogClose()
 * @param {String} props.type
 */
export default function AddDialog(props) {
    const classes = useStyles();
    const [person, setPerson] = React.useState();
    const [hierarchy, setHierarchy] = React.useState();

    function getCtrlkValue(value) { //get value from ctrlk component
        if (value)
            setPerson({ ...value, ...{ hierarchy: "earth/google/something/group3", id: 1 } });
        else
            setPerson();

    }

    function onHierarchy(hiera) { // value from Hierarchy field component onchange
        let value = hiera.target.value;
        if (value.length > 0)
            setHierarchy(value);
        else
            setHierarchy(null);
    }

    function onRadio(hiera) { // value from hierarchy suggestion radio onchange
        let value = hiera;
        if (value.length > 0)
            setHierarchy(value);
        else
            setHierarchy(null)
    }

    function onClose(){ // on dialog close
        props.dialogClose();
        setPerson();
    }
    function onSubmit() { // onsubmit
        props.dialogDone({ id: person.id, manages: hierarchy });
        setPerson();
        setHierarchy();
    }

    return (
        <div >
            <Dialog TransitionComponent={Transition} classes={{ paper: classes.dialog }}
                open={props.open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

                <DialogTitle id="alert-dialog-title" className={classes.title}>{"הוסף "+props.type}</DialogTitle>
                <DialogContent>
                    <div className={classes.input}>
                        <Ctrlk api='https://country.register.gov.uk/records.json?page-size=5000'
                            label="חפש" getCtrlkValue={getCtrlkValue} />
                    </div>
                    {person && 
                        <div>
                            <PersonInfo person={person} />
                            <p>איררכיה נוכחית: {hierarchy}</p>
                            <HierarchySuggest hierarchy={person.hierarchy} name={person.name} onRadio={onRadio} />
                            <HierarchyField onHierarchy={onHierarchy} />
                        </div>
                    }
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button onClick={onClose} color="primary" variant="contained">לא</Button>
                    <Button onClick={onSubmit} color="primary" variant="contained" disabled={!(hierarchy && person)}>הוסף</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
