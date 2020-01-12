import React from 'react';
import '../../App.css'
import AddHuman from './AddHuman/AddHuman';
import ManageTable2 from './ManageTable/ManageTable2'

// Test data, erase on prod and get from server instead with getData()
const test = [
  { name: 'Meh', number: 84813, unit: "haha", something: "da", manages: "react" },
  { name: 'met', number: 83813, unit: "ha", something: "da", manages: "angular" },
  { name: 'hmet', number: 24813, unit: "ha", something: "da4", manages: "react" },
  { name: 'ehmet', number: 14813, unit: "haha2", something: "da", manages: "node" },
  { name: 'ehme', number: 54813, unit: "haha2", something: "da3", manages: "react" },
  { name: 'wow', number: 84853, unit: "haha2", something: "da2", manages: "react" },
];

/**
 * Gets type and Renders table, with add option
 * @param {String} props.type
 */
export default function ManagePage(props) {
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
    console.log(person);
  }

  // Delete person by index from table click
  function onDelete(index){
    console.log(index);
  }

  return (
    <>
      <div className="animate">
        <ManageTable2 data={data} onDelete={onDelete} type={props.type}/>
      </div>
      <AddHuman onNewPerson={onNewPerson} type={props.type}/>
    </>
  );
}

