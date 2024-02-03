import * as React from 'react';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from "styled-components";
import { isMobile } from 'react-device-detect';
import Paper from '@mui/material/Paper';

import { setMaxCount } from '../store';
import { useDispatch, useSelector } from 'react-redux';

import MaxCount from '../components/SettingsMaxCount';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Calendar from '../components/Calendar';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const MyButton = styled(Button)(
  ({ theme }) => ({
    height: isMobile ? "40px" : "60px",
    fontSize: isMobile ? "20px" : "40px",
    color: theme.colors.colorDarkGold,
    border: "1px groove",
    borderColor: theme.colors.colorDarkGold,
    borderRadius: "20px",
    marginBottom: "10px",
    flex: 1,
    "&:hover": {
      background: theme.colors.colorDarkGold,
      color: theme.colors.colorWhite,
      borderColor: theme.colors.colorDarkGold,
    }
  })
);

const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  color: theme.colors.colorMainFont,
  backgroundColor: theme.colors.colorBg,
  height: 500,
  lineHeight: '60px',
  margin: "10px"
}));

function Statics() {
  const lists = useSelector((state) => state.datas);
  console.log(lists);
  const [openModal, setOpenModal] = React.useState(false);
  const [weekData, setWeekData] = React.useState(new Date());
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);  

  const getCurrentWeek = (day, gubun) => {
    // let day = new Date();
    
    // 일요일부터 시작
    // const _getDay = day.getTime() - 86400000 * day.getDay();

    // 월요일부터 시작
    const _getDay = day.getDay() === 0 ? 6 : day.getDay() - 1;
    const _startDay = day.getTime() - 86400000 * _getDay;
  
    day.setTime(_startDay);
  
    let result = [day.toISOString().slice(0, 10)];
  
    for (let i = 1; i < 7; i++) {
      day.setTime(day.getTime() + 86400000);
      result.push(day.toISOString().slice(0, 10));
    }
    result = result.map(date => date.replaceAll('-', '.'));
    return gubun === "start" ? result[0] : gubun === "end" ? result[6] : result;
  };
  
  const getData = () => {
    let weekPeriod = getCurrentWeek(weekData, "total");
    // let weekPeriod = ['2024.01.09', '2024.01.10', '2024.01.11', '2024.01.12', '2024.01.13', '2024.01.14', '2024.01.28'];
    const sampleData = weekPeriod.map(day => {
      let addressArray = [];
      for(const key in lists){
        if (lists[key]['time'].replaceAll('-', '.').includes(day)) addressArray.push(lists[key]['info']['address']);
      };
      return ({ 
        date: day.substr(2), 
        addressArray: addressArray
      })
    });

    return sampleData;
  };

  const dayData = getData();
  console.log('dayData = ', dayData);
  const startDay = getCurrentWeek(weekData, "start");
  const endDay = getCurrentWeek(weekData, "end");

  return (
    <Box sx={{ flexGrow: 1, margin: "auto", maxWidth: 1000, marginTop: "70px" }}>
      <Grid container spacing={3}>
       <Grid item xs></Grid>
        <Grid item xs={10}>
          <MyButton endIcon={<CalendarMonthIcon/>} onClick={handleOpen}>{startDay+" ~ "+endDay}</MyButton>
          <div style={{ display: isMobile ? '' : 'flex'}}>
            <Item key={0} elevation={5}>
              <BarChart dayData={getData()}></BarChart>
            </Item>
            <Item key={1} elevation={5}>
              <PieChart dayData={dayData}></PieChart>
            </Item>
          </div>
        </Grid>
        <Grid item xs></Grid>
      </Grid>

      <Dialog
          open={openModal}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{ width: "420px", border: "1px, groove", borderRadius: "20px" }}
        >
        <DialogContent>
          <Calendar handleClose={handleClose} setWeekData={setWeekData} weekData={startDay}></Calendar>
        </DialogContent>
      </Dialog>
    </Box>
    );
  }
  
  export default Statics;
  