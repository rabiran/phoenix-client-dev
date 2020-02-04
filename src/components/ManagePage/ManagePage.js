import React from 'react';
import axios from 'axios';
import '../../App.css';
import AddHuman from './AddHuman/AddHuman';
import ManageTable2 from './ManageTable/ManageTable2'
import config from '../../config';
import Alert from '../Stuff/Alert';
import Snackbar from '@material-ui/core/Snackbar';
// import Slide from '@material-ui/core/Slide';


// function TransitionUp(props) {
//     return <Slide direction="up" />;
// }

// import Alert from '../Stuff/Snack'

// Test data, erase on prod and get from server instead with getData()
// const test = [
//   { name: 'Meh', number: 84813, unit: "haha", rank: "da", manages: "react" },
//   { name: 'met', number: 83813, unit: "ha", rank: "da", manages: "angular" },
//   { name: 'hmet', number: 24813, unit: "ha", rank: "da4", manages: "react" },
//   { name: 'ehmet', number: 14813, unit: "haha2", rank: "da", manages: "node" },
//   { name: 'ehme', number: 54813, unit: "haha2", rank: "da3", manages: "react" },
//   { name: 'wow', number: 84853, unit: "haha2", rank: "da2", manages: "react" },
// ];

// let tempdata;

/**
 * Gets type and Renders table, with add option
 * @param {String} props.type
 */
export default function ManagePage(props) {
    const [data, setData] = React.useState([]);
    const [type, setType] = React.useState({ value: "", label: "" });
    //{value: "HR", label: "שליש"}
    const [isAlert, setOpenAlert] = React.useState(false);
    const [AlertMessage, setAlertMessage] = React.useState("warning");
    const [AlertSeverity, setAlertSeverity] = React.useState("something");

    const onAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };


    const openAlert = (type, message) => {
        setAlertMessage(message);
        setAlertSeverity(type);
        setOpenAlert(true);
    }

    // init ( componentdidmount )
    React.useEffect(() => {
        // async function init() {
        //     // await getType();
        //     await getData();
        // }
        // init();
        getData();
        document.title = "Manage page"
    // eslint-disable-next-line 
    }, [])

    // async function getType() {
    //   const res = await axios.get(`${config.backend}/api/auth`);
    //   res.status === 200 ? console.log("success") : console.log(`Error ${res.status}`);
    //   tempdata = res.data;
    // }

    //get Data from backend
    async function getData() {
        try{
            const res = await axios.get(`${config.backend}/api/findbyrespo`);
            res.status === 200 ? openAlert("success", "Got data succesfuly") : openAlert("error", `Getting data failed: Error ${res.status}`);
            setData(res.data.table);
            setType(res.data.type);
        }
        catch(err){
            openAlert("error", `Failed connecting to server`);
        }
    }

    // got new person from addhuman
    async function onNewPerson(person) {
        try{
            const res = await axios.put(`${config.backend}/api/updaterespo`, { personid: person.id, responsibility: type.value, hierarchy: person.manages })
            const res2 = await axios.put(`${config.backend}/api/updateunit`, { hierarchy: person.manages, akaUnit: person.currentUnit });
            (res.status === 200 && res2.status === 200) ? openAlert("success", "Added person succesfuly") : openAlert("error", `Add failed: Error ${res.status}`);
            await getData();
        }
        catch(err){
            openAlert("error", `Failed connecting to server`);
        }
    }

    // Delete person by index from table click
    async function onDelete(person) {
        try{
            const res = await axios.delete(`${config.backend}/api/deleterespo/${person.id}`)
            res.status === 200 ? openAlert("success", "Removed person succesfuly") : openAlert("error", `Remove failed: Error ${res.status}`);
            await getData();
        }
        catch(err){
            openAlert("error", `Failed connecting to server`);
        }
    }

    return (
        <div>
            <div className="animate">
                <ManageTable2 data={data} onDelete={onDelete} type={type.label} />
            </div>
            <AddHuman onNewPerson={onNewPerson} type={type.label} />
            <Snackbar open={isAlert} autoHideDuration={2000} onClose={onAlertClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                <Alert onClose={onAlertClose} severity={AlertSeverity} className="alertAnimate">
                    {AlertMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

