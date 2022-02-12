import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


export default function CollapsibleTable(props) { 

  const rows = props.pastes
  const isFilterd = props.isFilterd;
  const createRow = () =>{
    if(!rows.length) return;
    const allrows = rows.map((row, i) => (
     <Row key={`${row.date} +${i}`} row={row} />
    ))
    return allrows
  }

  return (
    <TableContainer className='tableBody' component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow> 
            <TableCell />
            <TableCell><h2>Title</h2></TableCell>
            <TableCell><h2>Author</h2></TableCell>
            <TableCell><h2>Date</h2></TableCell>
            <TableCell><h2>Time</h2></TableCell>
            <TableCell><h2>Sentiment</h2></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {createRow()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Row(props) {
  const  row  = props.row;
  const [open, setOpen] = React.useState(false);
  
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell >{row.author}</TableCell>
        <TableCell >{row.date.toString().substring(0,10)}</TableCell>
        <TableCell >{row.date.toString().substring(11,19)}</TableCell>
        <TableCell >{row.sentiment.toUpperCase()}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Message
              </Typography>
                {row.content}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}