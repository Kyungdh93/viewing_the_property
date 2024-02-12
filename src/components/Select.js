import React, { useState, useEffect } from 'react';
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
    width: isMobile === true ? '30vw' : '100%', 
    borderRadius: "20px",
    height: '55px'
  })
);

const BasicSelect = (props) => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };

  const handleChangeCountry = (e) => {
    setCountry(e.target.value);
    const cityFullName = city + ' ' + e.target.value;
    props.handleChangeCountry(cityFullName);
  };

  const cityArray = city === '서울시' ? seoulCities : city === '경기도' ? gyeonggidoCities : [];

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m:1, minWidth: 100 }}>
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
      <FormControl sx={{ m:1, minWidth: 100 }}>
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
    </Box>
  );
};

export default BasicSelect;