import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { todoUpdate } from '../store';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const dispatch = useDispatch();

  const { item } = useParams();
  const lists = useSelector((state) => state.datas);
  const itemData = lists[item];
  console.log('itemData in Table.js = ', itemData);

  const [editable, setEditable] = React.useState('');

  // console.log('rows = ', rows);

  const testClick = (keyName) => {
    setEditable(keyName);
  }

  const updateValue = (e, info) => {
    dispatch(todoUpdate(itemData.id, info));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>주소</StyledTableCell>
            <StyledTableCell>시공년도</StyledTableCell>
            <StyledTableCell>세대수</StyledTableCell>
            <StyledTableCell>대중교통</StyledTableCell>
            <StyledTableCell>학교</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(itemData.info).map((keyName, index) => (
            <StyledTableRow key={keyName}>
              <StyledTableCell onClick={()=>{testClick(keyName)}} sx={{width: '150px', height: '40px' }}>
                {
                  editable === keyName ? (
                    // <TextField defaultValue={itemData.info[keyName]} autoFocus size='small' sx={{width: '150px', height: '40px' }} onBlur={(e) => testBlur(keyName, index, e)}/>
                    <TextField 
                      defaultValue={itemData.info[keyName]} 
                      autoFocus 
                      size='small' 
                      sx={{width: '150px', height: '40px' }}
                      onBlur={(e)=>{
                        const info = {...itemData.info, [keyName]:e.target.value};
                        setEditable('');
                        updateValue(e, info);
                      }}
                    />
                    ) : (
                    itemData.info[keyName]
                  )
                }
              </StyledTableCell>

              {/* <StyledTableCell onClick={()=>{testClick(index, 0)}} sx={{width: '150px', height: '40px' }}>
                {
                  row.editable === true ? (
                    <TextField defaultValue={row.name} autoFocus size='small' sx={{width: '150px', height: '40px' }} onBlur={(e) => testBlur(row, index, e)}/>
                    ) : (
                    row.name
                  )
                }
              </StyledTableCell>

              <StyledTableCell>{row.calories}</StyledTableCell>
              <StyledTableCell>{row.fat}</StyledTableCell>
              <StyledTableCell>{row.carbs}</StyledTableCell>
              <StyledTableCell>{row.protein}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}