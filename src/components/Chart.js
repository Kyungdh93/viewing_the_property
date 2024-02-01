import { Line, LineChart, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
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
import Calendar from './Calendar';

const colors = ['black', 'red', 'purple', 'orange', 'green', 'yellow', 'blue', 'gray']

const RechartsExample = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);  

  return (      
      <Box sx={{ flexGrow: 1, margin: "auto", maxWidth: 1000 }}>
        <Grid container spacing={3}>
          <Grid item xs></Grid>
          <Grid item xs={12}>
            <h4 onClick={handleOpen}>2024.01.22 ~ 2024.01.28</h4>
            <BarChart width={isMobile ? 300 : 600} height={isMobile ? 200 : 250} data={sampleData3} >
              <XAxis dataKey="name" fontSize="10px" />
              <YAxis width={15}/>
              {/* <Tooltip /> */}
              <Bar dataKey="value" barSize={10} fill="#BD9816"/>
            </BarChart>

            <PieChart width={340} height={250}>
              <Pie data={sampleData2} cx="50%" cy="50%" outerRadius={80} label>
                {
                  sampleData2.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]}/>
                  ))
                }
              </Pie>
              <Legend width={100} verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
            </PieChart>
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
              <Calendar handleClose={handleClose}></Calendar>
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
    value: 2,
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