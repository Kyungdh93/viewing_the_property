import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import { filterUpdate } from '../store';
import { useDispatch, useSelector } from 'react-redux';

import { isMobile } from 'react-device-detect';
import Select from './Select';
import { styled } from "styled-components";

const MyList = styled(List)(
  () => ({
    height: "100px",
    width: isMobile === true ? '75vw' : '100%', 
    maxWidth: isMobile === true ? 320 : 1000,
    marginTop: "10px"
  })
);

const MyDiv = styled('div')(
  () => ({
    textAlign: "right", 
    marginTop: "1px",
    display: "block",
  })
);

const MyButton = styled(Button)(
  ({ theme }) => ({
    height: "30px",
    color: theme.colors.colorDiRed,
    border: "1px groove",
    borderColor: theme.colors.colorDiRed,
    borderRadius: "20px",
    flex: 1,
    "&:hover": {
      background: theme.colors.colorDiRed,
      color: theme.colors.colorWhite,
      borderColor: theme.colors.colorDiRed,
    }
  })
);

const Filter = () => {
  const dispatch = useDispatch();
  const filterArray = useSelector((state) => state.filterArray);

  const handleChangeCountry = (cityFullName) => {
    if (!filterArray.includes(cityFullName)) dispatch(filterUpdate([...filterArray, (cityFullName)]));
  };

  const removeSelectedCity = (selected) => {
    const num = filterArray.indexOf(selected);
    dispatch(filterUpdate(filterArray.filter((value, index) => index !== num )));
  };

  return (
    <MyList>
      <ListItem
      key={1}
      disableGutters
      secondaryAction={
          <Select handleChangeCountry={handleChangeCountry}></Select>
        }
      >
          <ListItemText primary={`지역`} />
      </ListItem>
      <br></br>
      <ListItem
      key={2}
      disableGutters
      secondaryAction={
          <MyDiv>
            {
              filterArray.map((selected, index) => (
                <MyButton endIcon={<ClearIcon/>} onClick={() => removeSelectedCity(selected)}>{selected}</MyButton>
              ))
            }
          </MyDiv>
        }
      >
          <ListItemText primary={``} />
      </ListItem>
      {/* <ListItem
      key={1}
      disableGutters
      secondaryAction={
          <Select></Select>
        }
      >
          <ListItemText primary={`날짜`} />
      </ListItem> */}
    </MyList>
  );
};

export default Filter;