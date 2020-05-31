import React from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


const useStyles = makeStyles({
  content: {
    margin: '0 auto',
    width: '75%',
    textAlign: 'center',
    marginTop: '50px',
  },
});

/**
 * Gets data, delete method and table type, renders table
 * @param {Array} props.data
 * @param {function} props.onDelete(index)
 * @param {String} props.type
 */
export default function ManageTable2(props) {
  const classes = useStyles();
  
  let columns = [
    { title: 'שם מלא', field: 'name' },
    { title: 'מספר אישי', field: 'number' },
    { title: 'יחידה', field: 'unit' },
    { title: 'דרגה', field: 'rank' },
    { title: 'מנהל את', field: 'manages' },
  ]
  return (
    <div className={classes.content}>
      <MaterialTable
        icons={tableIcons}
        title={"טבלת "+props.type}
        columns={columns}
        data={props.data}
        editable={{
          onRowDelete: oldData =>
            new Promise(resolve => {
              resolve()
              props.onDelete(oldData)
            })
        }}
        options = {{ pageSizeOptions: [3,5,10] }}
        localization={{
          pagination: {
              labelDisplayedRows: '{from}-{to} מתוך {count}',
              labelRowsSelect: "אנשים",
              labelRowsPerPage: "אנשים בעמוד:",
              firstAriaLabel: "עמוד ראשון",
              firstTooltip: "עמוד ראשון",
              previousAriaLabel: "עמוד קודם",
              previousTooltip: "עמוד קודם",
              nextAriaLabel: "עמוד הבא",
              nextTooltip: "עמוד הבא",
              lastAriaLabel: "עמוד אחרון",
              lastTooltip: "עמוד אחרון",

          },
          toolbar: {
              nRowsSelected: '{0} אנשים נבחרו',
              searchTooltip: "חפש",
              searchPlaceholder: "חפש"
          },
          header: {
              actions: 'פעולות'
          },
          body: {
              emptyDataSourceMessage: 'אין פה אף אחד!',
              filterRow: {
                  filterTooltip: 'Filter'
              },
              deleteTooltip: "מחק",
              editRow: {
                deleteText: "למחוק בן אדם זה מתפקיד זה?",
                cancelTooltip: "לא",
                saveTooltip: "כן"
              }
          }
      }}
      />
    </div>
  );
}

//props.data.indexOf(oldData)

// onRowAdd: newData =>
//             new Promise(resolve => {
//                 setTimeout(() => {
//                 resolve();
//                 setState(prevState => {
//                     const data = [...prevState.data];
//                     data.push(newData);
//                     return { ...prevState, data };
//                 });
//                 }, 600);
//             }),


// onRowUpdate: (newData, oldData) =>
// new Promise(resolve => {
//     setTimeout(() => {
//     resolve();
//     if (oldData) {
//         setState(prevState => {
//         const data = [...prevState.data];
//         data[data.indexOf(oldData)] = newData;
//         return { ...prevState, data };
//         });
//     }
//     }, 600);
// }),


// columns: [
//     { title: 'Name', field: 'name' },
//     { title: 'Surname', field: 'surname' },
//     { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
//     {
//       title: 'Birth Place',
//       field: 'birthCity',
//       lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
//     },
//   ],
//   data: [
//     { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
//     {
//       name: 'Zerya Betül',
//       surname: 'Baran',
//       birthYear: 2017,
//       birthCity: 34,
//     },
//   ],

// new Promise(resolve => {
//     setTimeout(() => {
//     resolve();
//     setState(prevState => {
//         const data = [...prevState.data];
//         data.splice(data.indexOf(oldData), 1);
//         return { ...prevState, data };
//     });
//     }, 600);
// }),