import * as React from 'react';

import { useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';

import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { todoUpdate } from '../store';
import Box from '@mui/material/Box';

import { isBrowser, isMobile } from 'react-device-detect';

// import Table1 from '../components/Table';

function Details() {
  const dispatch = useDispatch();
  const { item } = useParams();
  const [expanded, setExpanded] = React.useState('panel1');
  // const handleChange = (panel) => (event, newExpanded) => {
  //   setExpanded(newExpanded ? panel : false);
  // };

  const lists = useSelector((state) => state.datas);
  const itemData = lists[item];
  console.log('itemData = ', itemData);

  const nowYear = new Date().getFullYear();
  const naverLandUrl = 'https://land.naver.com';
  // const [title, setTitle] = React.useState(itemData.title);
  // const [address, setAddress] = React.useState(itemData.info.address);
  // const [year, setYear] = React.useState(itemData.info.year_of_construction);
  // const [households, setHouseholds] = React.useState(itemData.info.number_of_households);
  // const [parking, setParking] = React.useState(itemData.info.parking);
  // const [subway, setSbway] = React.useState(itemData.info.subway);
  // const [bus, setBus] = React.useState(itemData.info.bus);
  // const [school, setSchool] = React.useState(itemData.info.school);
  // const [heating, setHeating] = React.useState(itemData.info.heating);
  // const [managementStatus, setManagementStatus] = React.useState(itemData.info.management_status);
  // const [naverBdsUrl, setNaverBdsUrl] = React.useState(itemData.info.naver_bds_url);

  // const [jsonData, setJsonData] = React.useState(itemData);
  const updateValue = (e, info) => {
    dispatch(todoUpdate(itemData.id, info));
  };

  console.log('is browser = ', isBrowser);
  console.log('is mobile = ', isMobile);

  return (
    // <>
    //   <Table1></Table1>
    //   <Table1></Table1>
    //   <Table1></Table1>
    // </>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs></Grid>
        {/* <Grid item xs={6}> */}
        <Grid item xs={10}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h3" component="div">
            {itemData.title}
          </Typography>
          
          {/* <List sx={{ width: '100%', maxWidth: 1000 }}> */}
          <List sx={{ width: '100vw', maxWidth: 500 }}>
            <ListItem
              key={8}
              disableGutters
              secondaryAction={
                <OutlinedInput
                  defaultValue={itemData.info['expected_price']}
                  inputProps={{ style: { textAlign: "right" } }}
                  style={{ borderRadius: "20px", width: "200px" }}
                  // style={{ borderRadius: "20px", width: "20vw" }}
                  size='small'
                  endAdornment={<InputAdornment position="end">원</InputAdornment>}
                  onBlur={(e)=>{
                    const info = {...itemData.info, ['expected_price']:e.target.value};
                    updateValue(e, info);
                  }}
                />              
                }
            >
              <ListItemText primary={`예상 매매가`} />
              {/* <ListItemText primary={`예상 매매가`} primaryTypographyProps={{fontSize: '13px'}} /> */}
            </ListItem>
            <ListItem
              key={9}
              disableGutters
              secondaryAction={
                <OutlinedInput
                  defaultValue={itemData.info['expected_rent_price']}
                  inputProps={{ style: { textAlign: "right" } }}
                  style={{ borderRadius: "20px", width: "200px" }}
                  size='small'
                  startAdornment={<InputAdornment position="start">82%</InputAdornment>}
                  endAdornment={<InputAdornment position="end">원</InputAdornment>}
                  onBlur={(e)=>{
                    const info = {...itemData.info, ['expected_rent_price']:e.target.value};
                    updateValue(e, info);
                  }}
                />              
                }
            >
              <ListItemText primary={`예상 전세가`} />
            </ListItem>
            <ListItem
              key={110}
              disableGutters
              secondaryAction={
                  <Tooltip title={itemData.info['address']} placement="top">
                    <OutlinedInput
                      defaultValue={itemData.info['address']}
                      style={{ borderRadius: "20px", width: "250px" }}
                      size='small'
                      onBlur={(e)=>{
                        const info = {...itemData.info, ['address']:e.target.value};
                        updateValue(e, info);
                      }}
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
                  defaultValue={itemData.info['year_of_construction']}
                  inputProps={{ style: { textAlign: "right" } }}
                  style={{ borderRadius: "20px", width: "200px" }}
                  size='small'
                  startAdornment={<InputAdornment position="start">{itemData.info['year_of_construction'] === '' ? 0 : (nowYear-itemData.info['year_of_construction'])+1}년차</InputAdornment>}
                  endAdornment={<InputAdornment position="end">년</InputAdornment>}
                  onBlur={(e)=>{
                    const info = {...itemData.info, ['year_of_construction']:e.target.value};
                    updateValue(e, info);
                  }}
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
                  defaultValue={itemData.info['number_of_households']}
                  inputProps={{ style: { textAlign: "right" } }}
                  style={{ borderRadius: "20px", width: "200px" }}
                  size='small'
                  endAdornment={<InputAdornment position="end">세대</InputAdornment>}
                  onBlur={(e)=>{
                    const info = {...itemData.info, ['number_of_households']:e.target.value};
                    updateValue(e, info);
                  }}
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
                  defaultValue={itemData.info['parking']}
                  inputProps={{ style: { textAlign: "right" } }}
                  style={{ borderRadius: "20px", width: "200px" }}
                  size='small'
                  startAdornment={<InputAdornment position="start">세대당 {isFinite(itemData.info['parking']/itemData.info['number_of_households']) ? (Math.round((itemData.info['parking']/itemData.info['number_of_households'])*100)/100):0}대</InputAdornment>}
                  endAdornment={<InputAdornment position="end">대</InputAdornment>}
                  onBlur={(e)=>{
                    const info = {...itemData.info, ['parking']:e.target.value};
                    updateValue(e, info);
                  }}
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
                  defaultValue={itemData.info['subway']}
                  inputProps={{ style: { textAlign: "right" } }}
                  style={{ borderRadius: "20px", width: "250px" }}
                  size='small'
                  placeholder='4호선 사당역 도보 5분'
                  startAdornment={<InputAdornment position="start">지하철</InputAdornment>}
                  endAdornment={
                    <Tooltip title='지하철 추가' placement="top">
                      <AddCircleOutlineIcon style={{ cursor: "pointer" }} onClick={()=>window.open('https://land.naver.com/')}></AddCircleOutlineIcon>
                    </Tooltip>  
                    }
                  onBlur={(e)=>{
                    const info = {...itemData.info, ['subway']:e.target.value};
                    updateValue(e, info);
                  }}
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
                  defaultValue={itemData.info['bus']}
                  inputProps={{ style: { textAlign: "right" } }}
                  style={{ borderRadius: "20px", width: "250px" }}
                  size='small'
                  placeholder='도보 5분'
                  startAdornment={<InputAdornment position="start">버스</InputAdornment>}
                />            
              }
              onBlur={(e)=>{
                const info = {...itemData.info, ['bus']:e.target.value};
                updateValue(e, info);
              }}
            >
              <ListItemText primary={''} />
            </ListItem>
            <br></br>
            <ListItem
              key={5}
              disableGutters
              secondaryAction={
                <FormGroup aria-label="position" row 
                  onClick={(e)=>{
                    let result;
                    e.target.checked === true ? result = itemData.info['school'] + e.target.value : result = itemData.info['school'].replaceAll(e.target.value, '');
                    const info = {...itemData.info, ['school']:result};
                    updateValue(e, info);
                  }
                }>
                  <FormControlLabel
                    value="0"
                    control={<Checkbox defaultChecked={itemData.info['school'].includes('0') ? true : false}/>}
                    label="초등"
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Checkbox defaultChecked={itemData.info['school'].includes('1') ? true : false}/>}
                    label="중"
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Checkbox defaultChecked={itemData.info['school'].includes('2') ? true : false}/>}
                    label="고등"
                    labelPlacement="bottom"
                  />
                </FormGroup>
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
                <FormGroup aria-label="position" row 
                  onClick={(e)=>{
                    let result;
                    e.target.checked === true ? result = itemData.info['entrance_structure'] + e.target.value : result = itemData.info['entrance_structure'].replaceAll(e.target.value, '');
                    const info = {...itemData.info, ['entrance_structure']:result};
                    updateValue(e, info);
                  }
                }>
                  <FormControlLabel
                    value="0"
                    control={<Checkbox defaultChecked={itemData.info['entrance_structure'].includes('0') ? true : false}/>}
                    label="계단"
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Checkbox defaultChecked={itemData.info['entrance_structure'].includes('1') ? true : false}/>}
                    label="복도"
                    labelPlacement="bottom"
                    />
                  <FormControlLabel
                    value="2"
                    control={<Checkbox defaultChecked={itemData.info['entrance_structure'].includes('2') ? true : false}/>}
                    label="복합"
                    labelPlacement="bottom"
                  />
                </FormGroup>
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
                  defaultValue={itemData.info['heating']}
                  onClick={(e)=>{
                    const info = {...itemData.info, ['heating']:e.target.value};
                    updateValue(e, info);
                  }}
                >
                  <FormControlLabel
                    value="0"
                    control={<Radio/>}
                    label="지역"
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio size="medium"/>}
                    label="개별"
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    value="2"
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
                  defaultValue={itemData.info['management_status']}
                  onClick={(e)=>{
                    const info = {...itemData.info, ['management_status']:e.target.value};
                    updateValue(e, info);
                  }}
                >
                  <FormControlLabel
                    value="0"
                    control={<Radio/>}
                    label="나쁨"
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio size="medium"/>}
                    label="보통"
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    value="2"
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
            <ListItem
              key={81}
              disableGutters
              secondaryAction={
                  <OutlinedInput
                    defaultValue={itemData.info['naver_bds_url']}
                    placeholder={naverLandUrl}
                    inputProps={{ style: { textAlign: "left" } }}
                    style={{ borderRadius: "20px", width: "250px" }}
                    size='small'
                    endAdornment={
                      <Tooltip title='네이버 부동산으로 이동' placement="top">
                        <ExitToAppIcon style={{ cursor: "pointer" }} color="success" onClick={()=>window.open(itemData.info['naver_bds_url'])}></ExitToAppIcon>
                      </Tooltip>  
                      }
                    onBlur={(e)=>{
                      let result;
                      e.target.value === '' ? result = naverLandUrl : e.target.value.includes('land.naver.com') ? result = e.target.value : result = naverLandUrl;
                      const info = {...itemData.info, ['naver_bds_url']:result};
                      updateValue(e, info);
                    }}
                  />
                }
            >
              <ListItemText primary={`네이버 부동산 URL`} />
            </ListItem>
            <br></br>
            <Link to='/' style={{ textDecoration: "none", color: "inherit" }}>
              <Button fullWidth={true} size="large" style={{ borderRadius: "20px" }} variant="outlined" >
                뒤로가기
              </Button>
            </Link>
          </List>
        </Grid>
          <Grid item xs></Grid>
      </Grid>
    </Box>
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