import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddHuman from './AddHuman/AddHuman';
import ManageTable from './ManageTable/ManageTable'
import ManageTable2 from './ManageTable/ManageTable2'

const test = [
  { name: 'Meh', number: 84813, unit: "haha", something: "da", manages: "react" },
  { name: 'met', number: 83813, unit: "ha", something: "da", manages: "angular" },
  { name: 'hmet', number: 24813, unit: "ha", something: "da4", manages: "react" },
  { name: 'ehmet', number: 14813, unit: "haha2", something: "da", manages: "node" },
  { name: 'ehme', number: 54813, unit: "haha2", something: "da3", manages: "react" },
  { name: 'wow', number: 84853, unit: "haha2", something: "da2", manages: "react" },
];

export default function ManagePage() {
  const [data, setData] = React.useState([]);

  // init ( componentdidmount )
  React.useEffect(() => {
    getData();
  }, [])

  //get Data from backend
  async function getData() {
    setData(test);
  }

  // got new person from addhuman
  function onNewPerson(person) {
    // setData(data.push(person));
    console.log(person);
  }

  function onDelete(index){
    console.log(index);
  }

  

  return (
    <>
      <ManageTable2 data={data} onDelete={onDelete}/>
      <AddHuman onNewPerson={onNewPerson} />
    </>

  );
}

