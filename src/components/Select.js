import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { greaterSeoul, seoulCities, gyeonggidoCities } from '../store';
import { styled } from "styled-components";
import { isMobile } from 'react-device-detect';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';

const MySelect = styled(Select)(
  () => ({
    width: isMobile === true ? '30vw' : '50%', 
    borderRadius: "20px",
    height: '55px'
  })
);

const MyButton = styled(Button)(
  ({ theme }) => ({
    height: "30px",
    // width: "10px",
    // backgroundColor: theme.colors.colorMain,
    // color: theme.colors.colorMainFont,
    color: theme.colors.colorDiRed,
    border: "1px groove",
    borderColor: theme.colors.colorDiRed,
    borderRadius: "20px", 
    "&:hover": {
      background: theme.colors.colorDarkShadow,
      borderColor: theme.colors.colorDiRed,
    }
  })
);

const MyDiv = styled('div')(
  () => ({
    textAlign: "right", 
    marginTop: "1px"
  })
);

const BasicSelect = () => {
  const [city, setCity] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [selectedArray, setSelectedArray] = React.useState([]);

  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };

  const handleChangeCountry = (e) => {
    setSelectedArray([...selectedArray, (city + ' ' + e.target.value)]);
    setCountry(e.target.value);
  };

  const removeSelectedCity = (selected) => {
    selectedArray.pop(selected);
    setSelectedArray([...selectedArray]);
  };

  const cityArray = city === '서울특별시' ? seoulCities : city === '경기도' ? gyeonggidoCities : [];

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m:1, minWidth: 50 }}>
        <InputLabel id="demo-simple-select-label">시/도</InputLabel>
        <MySelect
          labelId="demo-simple-select-label"
          value={city}
          label="City"
          onChange={handleChangeCity}
        >
          {
            greaterSeoul.map((cityName, index) => (
              <MenuItem value={cityName}>{cityName}</MenuItem>
            ))
          }
        </MySelect>
      </FormControl>
      <FormControl sx={{ m:1, minWidth: 50 }}>
        <InputLabel id="demo-simple-select-label1">구/시</InputLabel>
        <MySelect
          labelId="demo-simple-select-label1"
          value={country}
          label="Country"
          onChange={handleChangeCountry}
        >
          {
            cityArray.map((cityName, index) => (
              <MenuItem value={cityName}>{cityName}</MenuItem>
            ))
          }
        </MySelect>
      </FormControl>
      <MyDiv>
        {
          selectedArray.map((selected, index) => (
            <MyButton endIcon={<ClearIcon/>} onClick={() => removeSelectedCity(selected)}>{selected}</MyButton>
          ))
        }
      </MyDiv>
    </Box>
  );
};

export default BasicSelect;