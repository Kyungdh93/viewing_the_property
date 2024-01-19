import * as React from 'react';

import { useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { useDispatch, useSelector } from 'react-redux';

function Details() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const { item } = useParams();
  const [expanded, setExpanded] = React.useState('panel1');
  // const handleChange = (panel) => (event, newExpanded) => {
  //   setExpanded(newExpanded ? panel : false);
  // };

  const lists = useSelector((state) => state.datas);
  const json_data = lists[item];

  return (
    <>
    <Grid container spacing={3}>
      <Grid item xs></Grid>
      <Grid item xs={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h3" component="div">
          {json_data["title"]}
        </Typography>
        
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>세대수</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <OutlinedInput
                id="outlined-adornment-weight"
                endAdornment={<InputAdornment position="end">세대</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
                placeholder="ex) 500"
              />
            </FormControl> */}
            <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
              <Input
                id="standard-adornment-weight"
                endAdornment={<InputAdornment position="end">세대</InputAdornment>}
                aria-describedby="standard-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
                placeholder="ex) 500"
              />
            </FormControl>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>관리</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              defaultValue="bottom"
            >
              <FormControlLabel
                value="1"
                control={<Radio/>}
                label="1"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="2"
                control={<Radio size="medium"/>}
                label="2"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="3"
                control={<Radio size="medium"/>}
                label="3"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="4"
                control={<Radio size="medium"/>}
                label="4"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="5"
                control={<Radio size="medium"/>}
                label="5"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>관리</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl sx={{ minWidth: 120 }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={subwayLines}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Lines" />}
            />
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
            <Autocomplete
              disabled={true}
              disablePortal
              id="combo-box-demo"
              options={subwayStations}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Stations" />}
            />
            </FormControl>
          </AccordionDetails>
        </Accordion>
      </Grid>
        <Grid item xs></Grid>
    </Grid>
    </>
  );
}

export default Details;

const subwayLines = [
  { label: '7호선', year: 1994 },
  { label: '1호선', year: 1972 },
  { label: '2호선', year: 1974 },
  { label: '3호선', year: 2008 },
  { label: '4호선', year: 1957 },
];

const subwayStations = [
  { label: '남구로역', year: 1994 },
  { label: '종로3가역', year: 1972 },
  { label: '홍대입구역', year: 1974 },
  { label: '구파발역', year: 2008 },
  { label: '이수역', year: 1957 },
];