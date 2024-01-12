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

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Details() {
  const { item } = useParams();
  const [expanded, setExpanded] = React.useState('panel1');
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
    <Typography sx={{ mt: 4, mb: 2 }} variant="h1" component="div">
      {item}
    </Typography>

    <Typography sx={{ mt: 4 }} variant="h6" component="div">
      세대수
    </Typography>
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
      {/* <FormLabel id="demo-form-control-label-placement">세대수</FormLabel> */}
      <OutlinedInput
        id="outlined-adornment-weight"
        endAdornment={<InputAdornment position="end">세대</InputAdornment>}
        aria-describedby="outlined-weight-helper-text"
        inputProps={{
          'aria-label': 'weight',
        }}
        placeholder="ex) 500"
      />
    </FormControl>
    
    <Typography sx={{ mt: 4 }} variant="h6" component="div">
      관리
    </Typography>
    <FormControl>
      {/* <FormLabel id="demo-form-control-label-placement">관리</FormLabel> */}
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

    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography>Expanded by default</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
    </Accordion>
    </>
  );
}

export default Details;
