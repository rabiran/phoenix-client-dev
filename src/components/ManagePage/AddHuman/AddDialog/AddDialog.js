import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Ctrlk from '../../../Stuff/Ctrlk';
import PersonInfo from './PersonInfo/PersonInfo';
import HierarchyFIeld from './HierarchyField/HierarchyField';
import HierarchySuggest from './HierarchyField/HierarchySuggest';

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


let hierarchyId;
let choosenHierarchy;

export default function AddDialog(props) {
    const classes = useStyles();
    const [person, setPerson] = React.useState();
    const [hierarchy, setHierarchy] = React.useState();

    function getCtrlkValue(value){ //get value from ctrlk component
        if(value)
            setPerson({...value, ...{hierarchy: "earth/google/something/group3",id: 1}});
        else
            setPerson();
        choosenHierarchy="earth/google/something/group3";
    }

    function onHierarchy(hiera){ // value from Hierarchy field component onchange
        let value = hiera.target.value;
        if(value.length > 0)
            setHierarchy(value);
        else
            setHierarchy(null);
    }

    let personTxt = [];
    let addTitle = <p></p>
    let hierarchyfield;
    let hierarchysuggest;
    if(person){
        personTxt = person;
        addTitle = <p>Add {person.name} to manage:</p>;
        hierarchyfield = <HierarchyFIeld onHierarchy={onHierarchy}/>;
        console.log(person);
        hierarchysuggest=<HierarchySuggest hierarchy={person.hierarchy}/>
    }
    
    return (
        <div >
            <Dialog classes={{ paper: classes.dialog }}
                open={props.open}
                onClose={props.dialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Add human</DialogTitle>
                <DialogContent>
                    <Ctrlk api='https://country.register.gov.uk/records.json?page-size=5000'
                    label="Find human" getCtrlkValue={getCtrlkValue}/>
                    <PersonInfo person={personTxt}/>
                    <Divider />
                    {addTitle}
                    {hierarchysuggest}
                    {hierarchyfield}
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button onClick={props.dialogClose} color="primary" variant="contained">NO</Button>
                    <Button onClick={()=>props.dialogDone({id: person.id, manages: hierarchyId})} color="primary" variant="contained" disabled={!(hierarchy && person)}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
