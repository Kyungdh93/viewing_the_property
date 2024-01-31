import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { greaterSeoul, seoulCities, gyeonggidoCities } from '../store';

export default function BasicSelect() {
  const [city, setCity] = React.useState('');
  const [country, setCountry] = React.useState('');

  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };

  const handleChangeCountry = (e) => {
    console.log(city + ' ' + e.target.value);
    setCountry(e.target.value);
  };

  const cityArray = city === '서울특별시' ? seoulCities : city === '경기도' ? gyeonggidoCities : [];

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m:1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">City</InputLabel>
        <Select
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
        </Select>
      </FormControl>
      <FormControl sx={{ m:1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label1">Country</InputLabel>
        <Select
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
        </Select>
      </FormControl>
    </Box>
  );
}