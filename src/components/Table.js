import React, { useState, useEffect } from 'react';
// import { styled } from '@mui/material/styles';
import { styled } from "styled-components";
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

import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const MyTableHeader = styled(TableCell)(
  ({ theme }) => ({
    backgroundColor: theme.colors.colorMain, 
    color: theme.colors.colorMainFont,
    width: "50px", 
    height: "40px",
    textAlign: "center",
  })
)

const MyTableCell = styled(TableCell)(
  ({ theme }) => ({
    backgroundColor: theme.colors.colorDarkGray, 
    width: "150px", 
    height: "40px",
    textAlign: "right",
  })
)

const MyCheckbox = styled(Checkbox)(
  ({ theme }) => ({
    color: theme.colors.colorMainFont,
    '&.Mui-checked': {
      color: theme.colors.colorDiRed
    }
  })
);

const MyRadio = styled(Radio)(
  ({ theme }) => ({
    color: theme.colors.colorMainFont,
    '&.Mui-checked': {
      color: theme.colors.colorDiRed
    }
  })
);

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   width: '150px', 
//   height: '40px',
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

export default function CustomizedTables(props) {
  const dispatch = useDispatch();
  const { item } = useParams();
  const lists = useSelector((state) => state.datas);
  const itemData = lists[item];
  // console.log('itemData in Table.js = ', itemData);

  const [expectedPrice, setExpectedPrice] = useState(Number(itemData.info['expected_price']));
  const [expectedRentPrice, setExpectedRentPrice] = useState(Number(itemData.info['expected_rent_price']));
  const mappingData = props.mappingData;
  const orderArray = props.orderArray;
  const nowYear = props.nowYear;
  const naverLandUrl = props.naverLandUrl;

  const [editable, setEditable] = useState('');

  // console.log('rows = ', rows);

  const testClick = (keyName) => {
    setEditable(keyName);
  }

  const updateValue = (e, info) => {
    dispatch(todoUpdate(itemData.id, info));
  };

  return (
      <Table sx={{ minWidth: 100, width: 500, margin: "auto" }} aria-label="customized table">
        <TableBody sx={{tableLayout: "fixed"}}>
          {orderArray.map((keyName, index) => (
            <TableRow key={keyName}>
              {/* {
                index % 2 === 0 ? (
                  <StyledTableCell rowSpan={2} sx={{ backgroundColor: "blue", width: "50px" }}> {mappingData[keyName]} </StyledTableCell>
                  ) : (
                  <></>
                )
              } */}
              <MyTableHeader> {mappingData[keyName][0]} </MyTableHeader>
              {
                mappingData[keyName][1] === 'input' ? (
                  <MyTableCell onClick={()=>{testClick(keyName)}}>
                    {
                      editable === keyName ? (
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
                  </MyTableCell>
                ) : mappingData[keyName][1] === 'checkbox' ? (
                  <MyTableCell>
                    <FormGroup aria-label="position" row
                      onClick={(e)=>{
                        let result;
                        e.target.checked === true ? result = itemData.info[keyName] + e.target.value : result = itemData.info[keyName].replaceAll(e.target.value, '');
                        const info = {...itemData.info, [keyName]:result};
                        updateValue(e, info);
                      }
                    }>
                      <FormControlLabel
                        value="0"
                        control={<MyCheckbox defaultChecked={itemData.info[keyName].includes('0') ? true : false}/>}
                        label="초등"
                        labelPlacement="bottom"
                      />
                      <FormControlLabel
                        value="1"
                        control={<MyCheckbox defaultChecked={itemData.info[keyName].includes('1') ? true : false}/>}
                        label="중"
                        labelPlacement="bottom"
                      />
                      <FormControlLabel
                        value="2"
                        control={<MyCheckbox defaultChecked={itemData.info[keyName].includes('2') ? true : false}/>}
                        label="고등"
                        labelPlacement="bottom"
                      />
                    </FormGroup>
                  </MyTableCell>
                  ) : mappingData[keyName][1] === 'radio' ? (
                  <MyTableCell>
                    <RadioGroup
                      row
                      aria-labelledby="demo-form-control-label-placement"
                      name="position"
                      defaultValue={itemData.info[keyName]}
                      onClick={(e)=>{
                        const info = {...itemData.info, [keyName]:e.target.value};
                        updateValue(e, info);
                      }}
                    >
                      <FormControlLabel
                        value="0"
                        control={<MyRadio/>}
                        label={keyName === 'entrance_structure' ? "계단식" : keyName === "heating" ? "지역" : "나쁨"}
                        labelPlacement="bottom"
                      />
                      <FormControlLabel
                        value="1"
                        control={<MyRadio size="medium"/>}
                        label={keyName === 'entrance_structure' ? "복도식" : keyName === "heating" ? "개별" : "보통"}
                        labelPlacement="bottom"
                      />
                      <FormControlLabel
                        value="2"
                        control={<MyRadio size="medium"/>}
                        label={keyName === 'entrance_structure' ? "복합식" : keyName === "heating" ? "중앙" : "좋음"}
                        labelPlacement="bottom"
                      />
                    </RadioGroup>
                  </MyTableCell>
                  ) : (
                  <MyTableCell>{itemData.info[keyName]}</MyTableCell>
                )
              }
              </TableRow>
          ))}
        </TableBody>
      </Table>
  );
}