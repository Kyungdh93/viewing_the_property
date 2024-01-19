import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { setMaxCount } from '../store';
import { useDispatch, useSelector } from 'react-redux';

function Settings() {
  const max_count = useSelector((state) => state.maxCount);
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    dispatch(setMaxCount(e.target.value));
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Max Count</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={max_count}
          label="Max Count"
          onChange={handleChange}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>
    </Box>
    );
  }
  
  export default Settings;
  