import { Line, LineChart, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from "styled-components";
import { isMobile } from 'react-device-detect';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { PieChart } from '@mui/x-charts/PieChart';
import Calendar from './Calendar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';

const colors = ['black', 'red', 'purple', 'orange', 'green', 'yellow', 'blue', 'gray']

const MyButton = styled(Button)(
  ({ theme }) => ({
    height: "40px",
    fontSize: "20px",
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

const RechartsExample = () => {
  const [openModal, setOpenModal] = React.useState(false);
  // const [weekData, setWeekData] = React.useState('2024.01.22 ~ 2024.01.28');
  const [weekData, setWeekData] = React.useState(new Date());
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);  

  const getCurrentWeek = (day, gubun) => {
    // let day = new Date();
    
    // 일요일부터 시작
    // const _startDay = day.getTime() - 86400000 * day.getDay();

    // 월요일부터 시작
    const _getDay = day.getDay() === 0 ? 6 : day.getDay() - 1;
    const _startDay = day.getTime() - 86400000 * _getDay;
  
    day.setTime(_startDay);
  
    const result = [day.toISOString().slice(0, 10)];
  
    for (let i = 1; i < 7; i++) {
      day.setTime(day.getTime() + 86400000);
      result.push(day.toISOString().slice(0, 10));
    }
  
    // return result;
    return gubun === "start" ? result[0] : gubun === "end" ? result[6] : result;
    // return result[0] + ' ~ ' + result[6];
  };

  const startDay = getCurrentWeek(weekData, "start");
  const endDay = getCurrentWeek(weekData, "end");
  
  const getData = () => {
    const week = getCurrentWeek(weekData, "total");
    // ['2024-01-09', '2024-01-10', '2024-01-11', '2024-01-12', '2024-01-13', '2024-01-14', '2024-01-15']
    
    const sampleData = week.map(day => ({ name: day, value: 3 }));
    return sampleData;
  };

  return (      
      <Box sx={{ flexGrow: 1, margin: "auto", maxWidth: 1000 }}>
        <Grid container spacing={3}>
          <Grid item xs></Grid>
          <Grid item xs={12}>
            <MyButton endIcon={<CalendarMonthIcon/>} onClick={handleOpen}>{startDay+" ~ "+endDay}</MyButton>
            <BarChart width={isMobile ? 300 : 600} height={isMobile ? 200 : 250} data={getData()} >
              <XAxis dataKey="name" fontSize="10px" />
              <YAxis width={30}/>
              <Tooltip />
              <Bar dataKey="value" barSize={15} fill="#BD9816"/>
            </BarChart>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: '동대문구' },
                    { id: 1, value: 15, label: '영등포구' },
                    { id: 2, value: 20, label: '은평구' },
                    { id: 3, value: 20, label: '구로구' },
                    { id: 4, value: 2, label: '금천구' },
                    { id: 5, value: 12, label: '강남구' },
                    { id: 6, value: 13, label: '서대문구' },
                    { id: 7, value: 20, label: '기타' },
                  ],
                  innerRadius: 30,
                  outerRadius: 100,
                  paddingAngle: 3,
                  cornerRadius: 5,
                  startAngle: 0,
                  endAngle: 360,
                  cy: 150,
                },
              ]}
              width={330}
              height={280}
            />
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
};

const sampleData1 = [
  {
    name: "1월",
    서울: 3,
    경기: 3,
    인천: 3,
  },
  {
    name: "2월",
    서울: 4,
    경기: 4,
    인천: 4,
  },
  {
    name: "3월",
    서울: 1,
    경기: 1,
    인천: 1,
  },
  {
    name: "4월",
    서울: 1,
    경기: 1,
    인천: 2,
  },
  {
    name: "5월",
    서울: 1,
    경기: 1,
    인천: 4,
  },
  {
    name: "6월",
    서울: 2,
    경기: 5,
    인천: 2,
  },
  {
    name: "7월",    
    서울: 1,
    경기: 2,
    인천: 3,
  },
  {
    name: "8월",
    서울: 5,
    경기: 1,
    인천: 3,
  },
  {
    name: "9월",
    서울: 3,
    경기: 3,
    인천: 3,
  },
  {
    name: "10월",
    서울: 4,
    경기: 2,
    인천: 1,
  },
  {
    name: "11월",
    서울: 6,
    경기: 2,
    인천: 3,
  },
  {
    name: "12월",
    서울: 1,
    경기: 5,
    인천: 3,
  },
];

const sampleData2 = [
  {
    name: "은평구",
    value: 3,
  },
  {
    name: "동작구",
    value: 4,
  },
  {
    name: "용산구",
    value: 7,
  },
  {
    name: "강남구",
    value: 1,
  },
  {
    name: "강서구",
    value: 3,
  },
  {
    name: "동대문구",
    value: 2,
  },
  {
    name: "성북구",
    value: 5,
  },
  {
    name: "구로구",
    value: 4,
  },
];

const sampleData3 = [
  {
    name: "1/22",
    value: 3,
  },
  {
    name: "1/23",
    value: 4,
  },
  {
    name: "1/24",
    value: 7,
  },
  {
    name: "1/25",
    value: 1,
  },
  {
    name: "1/26",
    value: 3,
  },
  {
    name: "1/27",
    value: 20,
  },
  {
    name: "1/28",
    value: 5,
  },
];

const sampleData4 = [
  {
    id: 0,
    label: "은평구",
    value: 3,
  },
  {
    id: 1,
    label: "동작구",
    value: 4,
  },
  {
    id: 2,
    label: "용산구",
    value: 7,
  },
  {
    id: 4,
    label: "강남구",
    value: 1,
  },
  {
    id: 3,
    label: "강서구",
    value: 3,
  },
  {
    id: 5,
    label: "동대문구",
    value: 2,
  },
  {
    id: 6,
    label: "성북구",
    value: 5,
  },
  {
    id: 7,
    label: "구로구",
    value: 4,
  },
];

export default RechartsExample;