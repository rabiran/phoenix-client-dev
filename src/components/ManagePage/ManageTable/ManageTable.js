
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Title from '../../Stuff/Title';

const useStyles = makeStyles({
    content: {
        margin: '0 auto',
        width: '75%',
        textAlign: 'center',
        marginTop: '50px',
    },
    paper: {
        position: 'relative',
        background: 'whitesmoke',
        padding: '10px'
    },
    tableHeader:{
        display: "flex",
        justifyContent: 'space-between',
        width: '100%',
    },
    searchArea: {
        position: 'absolute',
        bottom: '0',
        paddingBottom: '10px'
    }
});

// '&>Div':{
//     marginRight: '30px'
// }

function createData(name, number, unit, something, manages) {
    return { name, number, unit, something, manages };
}

let rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const rowsOptions = [3,5,10];

export default function ManageTable() {
    const classes = useStyles();
    const [data, setData] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(rowsOptions[1]);
    const [page, setPage] = React.useState(0);

    async function getData(){
        for(let i=0; i<5; i++){
            rows.push(createData('Gingerbread', 356, 16.0, 49, 3.9));
        }
        setData(rows);
        console.log(rows);
    }

    React.useEffect(()=>{
         getData();
    },[])

    const handleChangePage = (event, newPage) => {
        console.log(data.length);
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function tableSearch(e){
        let value = e.target.value;
        console.log(value);
    }

    return (
        <div className={classes.content}>
            <Paper className={classes.paper}>
            
                <Title title="Manage"/>
              <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>name</TableCell>
                      <TableCell align="right">number</TableCell>
                      <TableCell align="right">unit</TableCell>
                      <TableCell align="right">something</TableCell>
                      <TableCell align="right">manages</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data,ind) => (
                      <TableRow key={data.name + String(ind)}>
                        <TableCell component="th" scope="row">
                          {data.name}
                        </TableCell>
                        <TableCell align="right">{data.number}</TableCell>
                        <TableCell align="right">{data.unit}</TableCell>
                        <TableCell align="right">{data.something}</TableCell>
                        <TableCell align="right">{data.manages}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={rowsOptions}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <div className={classes.searchArea}>
                <TextField id="standard-basic" label="find" style={{width: '50%'}} onChange={tableSearch}/>
            </div>
            </Paper>
        </div>
    );
}

{/* <div className={classes.tableHeader}> 
                <Title title="Manage"/>
                <TextField id="standard-basic" label="find" />
            </div> */}
