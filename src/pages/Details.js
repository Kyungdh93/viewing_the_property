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
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { useDispatch, useSelector } from 'react-redux';
import { WindowSharp } from '@mui/icons-material';

// import Table1 from '../components/Table';

function Details() {
  const [address, setAddress] = React.useState("");
  const [parking, setParking] = React.useState(0);
  const [households, setHouseholds] = React.useState(0);
  
  const { item } = useParams();
  const [expanded, setExpanded] = React.useState('panel1');
  // const handleChange = (panel) => (event, newExpanded) => {
  //   setExpanded(newExpanded ? panel : false);
  // };

  const lists = useSelector((state) => state.datas);
  const json_data = lists[item];
  console.log(json_data);

  return (
    // <>
    //   <Table1></Table1>
    //   <Table1></Table1>
    //   <Table1></Table1>
    // </>
    <>
    <Grid container spacing={3}>
      <Grid item xs></Grid>
      <Grid item xs={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h3" component="div">
          {json_data["title"]}
        </Typography>
        
        
        <List sx={{ width: '100%', maxWidth: 500 }}>
          <ListItem
            key={8}
            disableGutters
            secondaryAction={
              <OutlinedInput
                inputProps={{ style: { textAlign: "right" } }}
                style={{ borderRadius: "20px", width: "200px" }}
                size='small'
                endAdornment={<InputAdornment position="end">원</InputAdornment>}
              />              
              }
          >
            <ListItemText primary={`예상 매매가`} />
          </ListItem>
          <ListItem
            key={9}
            disableGutters
            secondaryAction={
              <OutlinedInput
                inputProps={{ style: { textAlign: "right" } }}
                style={{ borderRadius: "20px", width: "200px" }}
                size='small'
                startAdornment={<InputAdornment position="start">82%</InputAdornment>}
                endAdornment={<InputAdornment position="end">원</InputAdornment>}
              />              
              }
          >
            <ListItemText primary={`예상 전세가`} />
          </ListItem>
          <ListItem
            key={0}
            disableGutters
            secondaryAction={
              <Tooltip title={address} placement="top">
                  <OutlinedInput
                    value={address}
                    style={{ borderRadius: "20px" }}
                    size='small'
                    onChange={(e)=>setAddress(e.target.value)}
                  />              
                </Tooltip>
              }
          >
            <ListItemText primary={`주소`} />
          </ListItem>
          <ListItem
            key={10}
            disableGutters
            secondaryAction={
              <OutlinedInput
                inputProps={{ style: { textAlign: "right" } }}
                style={{ borderRadius: "20px", width: "200px" }}
                size='small'
                startAdornment={<InputAdornment position="start">00년차</InputAdornment>}
                endAdornment={<InputAdornment position="end">년</InputAdornment>}
              />              
              }
          >
            <ListItemText primary={`시공년도`} />
          </ListItem>
         <ListItem
            key={1}
            disableGutters
            secondaryAction={
              <OutlinedInput
                value={households}
                inputProps={{ style: { textAlign: "right" } }}
                style={{ borderRadius: "20px", width: "200px" }}
                size='small'
                endAdornment={<InputAdornment position="end">세대</InputAdornment>}
                onChange={(e)=>setHouseholds(e.target.value)}
              />              
              }
          >
            <ListItemText primary={`세대수`} />
          </ListItem>
          <ListItem
            key={11}
            disableGutters
            secondaryAction={
              <OutlinedInput
                value={parking}
                inputProps={{ style: { textAlign: "right" } }}
                style={{ borderRadius: "20px", width: "200px" }}
                size='small'
                startAdornment={<InputAdornment position="start">세대당 {parking/households}대</InputAdornment>}
                endAdornment={<InputAdornment position="end">대</InputAdornment>}
                onChange={(e) => setParking(e.target.value)}
              />              
              }
          >
            <ListItemText primary={`주차`} />
          </ListItem>
          <ListItem
            key={3}
            disableGutters
            secondaryAction={
              <OutlinedInput
                style={{ borderRadius: "20px" }}
                size='small'
                startAdornment={<InputAdornment position="start">지하철</InputAdornment>}
              />      
            }
          >
            <ListItemText primary={`대중교통`} />
          </ListItem>
          <ListItem
            style={{ marginTop: '12px'}}
            key={4}
            disableGutters
            secondaryAction={
              <OutlinedInput
                style={{ borderRadius: "20px" }}
                size='small'
                startAdornment={<InputAdornment position="start">버스</InputAdornment>}
              />            
            }
          >
            <ListItemText primary={''} />
          </ListItem>
          <br></br>
          <ListItem
            key={5}
            disableGutters
            secondaryAction={
              <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="bottom"
                    control={<Checkbox />}
                    label="초"
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    value="bottom"
                    control={<Checkbox />}
                    label="중"
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    value="bottom"
                    control={<Checkbox />}
                    label="고"
                    labelPlacement="bottom"
                  />
                </FormGroup>
              </FormControl>          
            }
          >
            {/* <ListItemIcon style={{ cursor: 'pointer' }} onClick={()=>console.log('CLICK!!')}>
              <CommentIcon />
            </ListItemIcon> */}
            <ListItemText primary={`학교`} />
          </ListItem>
          <br></br>
          <ListItem
            key={6}
            disableGutters
            secondaryAction={
              <FormControl component="fieldset" >
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="bottom"
                    control={<Checkbox />}
                    label="계단식"
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    value="bottom"
                    control={<Checkbox />}
                    label="복도식"
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    value="bottom"
                    control={<Checkbox />}
                    label="복합식"
                    labelPlacement="bottom"
                  />
                </FormGroup>
              </FormControl>        
            }
          >
            <ListItemText primary={`현관구조`} onClick={()=>console.log("rr")}/>
          </ListItem>
          <br></br>
          <ListItem
            key={7}
            disableGutters
            secondaryAction={
              <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              defaultValue="bottom"
            >
              <FormControlLabel
                value="1"
                control={<Radio/>}
                label="지역"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="2"
                control={<Radio size="medium"/>}
                label="개별"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="3"
                control={<Radio size="medium"/>}
                label="중앙"
                labelPlacement="bottom"
              />
            </RadioGroup>           
              }
          >
            <ListItemText primary={`난방`} />
          </ListItem>
          <br></br>
          <ListItem
            key={2}
            disableGutters
            secondaryAction={
              <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              defaultValue="bottom"
            >
              <FormControlLabel
                value="1"
                control={<Radio/>}
                label="나쁨"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="2"
                control={<Radio size="medium"/>}
                label="보통"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="3"
                control={<Radio size="medium"/>}
                label="좋음"
                labelPlacement="bottom"
              />
            </RadioGroup>           
              }
          >
            <ListItemText primary={`관리상태`} />
          </ListItem>
          <br></br>
        </List>
        <br></br>
        <Button fullWidth={true} size="large" style={{ borderRadius: "20px" }} variant="contained" color="success" startIcon={<HomeIcon />} onClick={()=>window.open('https://land.naver.com/')}>
          네이버 부동산 열기
        </Button>

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