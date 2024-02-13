import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from "styled-components";
import { isMobile } from 'react-device-detect';
import Paper from '@mui/material/Paper';

import { useSelector } from 'react-redux';

import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Calendar from '../components/Calendar';
import Title from '../components/Title';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const MyBox = styled(Box)(
  () => ({
    flexGrow: 1, 
    margin: "auto", 
    maxWidth: 1000, 
    marginTop: isMobile ? "10px" : "70px"
  })
)

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
  backgroundColor: theme.colors.colorMain,
  height: 500,
  lineHeight: '60px',
  margin: "10px",
  borderRadius: "20px"
}));

const Statics = () => {
  const lists = useSelector((state) => state.datas);
  const [openModal, setOpenModal] = useState(false);
  const [weekData, setWeekData] = useState(new Date());
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
  
    for (let i=1; i<7; i++) {
      day.setTime(day.getTime() + 86400000);
      result.push(day.toISOString().slice(0, 10));
    }
    result = result.map(date => date.replaceAll('-', '.'));
    return gubun === "start" ? result[0] : gubun === "end" ? result[6] : result;
  };
  
  const getData = () => {
    let weekPeriod = getCurrentWeek(weekData, "total");
    // let weekPeriod = ['2024.01.09', '2024.01.10', '2024.01.11', '2024.01.12', '2024.01.13', '2024.01.14', '2024.01.28'];
    const resultData = weekPeriod.map(day => {
      let addressArray = [];
      for(const key in lists){
        if (lists[key]['time'].replaceAll('-', '.').includes(day)) addressArray.push(lists[key]['info']['address']);
      };
      return ({ 
        date: day.substr(2), 
        addressArray: addressArray
      })
    });

    return resultData;
  };

  const dayData = getData();
  const startDay = getCurrentWeek(weekData, "start");
  const endDay = getCurrentWeek(weekData, "end");

  return (
    <MyBox>
      <Grid container spacing={3}>
       <Grid item xs></Grid>
        <Grid item xs={isMobile ? 12 : 11}>
          <Title title="통계"></Title>
          <MyButton endIcon={<CalendarMonthIcon/>} onClick={handleOpen}>{startDay+" ~ "+endDay}</MyButton>
          <div style={{ display: isMobile ? '' : 'flex'}}>
            <Item key={0} elevation={5}>
              <BarChart dayData={dayData}></BarChart>
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
    </MyBox>
    );
  }
  
  export default Statics;
  