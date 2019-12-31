import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Ctrlk from '../../../Stuff/Ctrlk';
import PersonInfo from './PersonInfo/PersonInfo';
import HierarchyField from './HierarchyField/HierarchyField';
import HierarchySuggest from './HierarchyField/HierarchySuggest';
import Grow from '@material-ui/core/Grow';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow timeout={2000} ref={ref} {...props} />;
});

const useStyles = makeStyles({
    dialog: {
        minHeight: '50%',
        height: '75%',
        minWidth: '400px',
        width: '50%'
    },
    actions: {
        display: 'flex',
        justifyContent: 'center'
    }
});

/**
 * Gets open value, dialogDone and dialogClose methods, renders the dialog it self open.
 * @param {boolean} props.open
 * @param {function} props.dialogDone({id,hierarchy}) 
 * @param {function} props.dialogClose()
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

    function onSubmit() { // onsubmit
        props.dialogDone({ id: person.id, manages: hierarchy });
        setPerson();
    }

    // Some bullshit to render extra info only after person choosen:
    let personTxt = [];
    let addTitle = <p></p>
    let hierarchyfield;
    let hierarchysuggest;
    if (person) {
        personTxt = person;
        addTitle = <p>Add {person.name} to manage:</p>;
        hierarchyfield = <HierarchyField onHierarchy={onHierarchy} />;
        hierarchysuggest = <HierarchySuggest hierarchy={person.hierarchy} onRadio={onRadio} />
    }

    return (
        <div >
            <Dialog TransitionComponent={Transition} classes={{ paper: classes.dialog }}
                open={props.open}
                onClose={props.dialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Add human</DialogTitle>
                <DialogContent>
                    <Ctrlk api='https://country.register.gov.uk/records.json?page-size=5000'
                        label="Find human" getCtrlkValue={getCtrlkValue} />
                    <PersonInfo person={personTxt} />
                    <Divider />
                    {addTitle}
                    {hierarchysuggest}
                    {hierarchyfield}
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button onClick={props.dialogClose} color="primary" variant="contained">NO</Button>
                    <Button onClick={onSubmit} color="primary" variant="contained" disabled={!(hierarchy && person)}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
