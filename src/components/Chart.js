import { Line, LineChart, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from "styled-components";
import { isMobile } from 'react-device-detect';

const MyLineChart = styled(LineChart)(
  ({ theme }) => ({
    width: 600,
    height: 300
  })
);

const colors = ['black', 'red', 'purple', 'orange', 'green', 'yellow', 'blue', 'gray']

const RechartsExample = () => {
  return (      
      <Box sx={{ flexGrow: 1, margin: "auto", maxWidth: 1000, marginTop: "10px" }}>
        <Grid container spacing={3}>
          <Grid item xs></Grid>
          <Grid item xs={12}>
            {/* <h1>2024년</h1>
            <LineChart width={isMobile ? 300 : 600} height={isMobile ? 400 : 300} data={sampleData1}>
              <Line type="linear" dataKey="서울" stroke="#0CD3FF" strokeWidth={3} />
              <Line type="monotone" dataKey="경기" stroke="#a6120d" strokeWidth={3} />
              <Line type="natural" dataKey="인천" stroke="#FFCA29" strokeWidth={3} />
              <CartesianGrid stroke="#ccc" />
              <YAxis />
              <XAxis dataKey="name" />
              <Tooltip />
              <Legend />
            </LineChart>
            <br></br> */}

            <h2>1월 22일 ~ 1월 28일</h2>
            <BarChart width={isMobile ? 300 : 600} height={isMobile ? 200 : 250} data={sampleData3} >
              <XAxis dataKey="name" fontSize="10px" />
              <YAxis width={15}/>
              {/* <Tooltip /> */}
              <Bar dataKey="value" barSize={10} fill="#8884d8" />
            </BarChart>

            {/* <h1>2024년 4월</h1> */}
            <PieChart width={340} height={250}>
              <Pie data={sampleData2} cx="50%" cy="50%" outerRadius={80} label>
                {
                  sampleData2.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]}/>
                  ))
                }
              </Pie>
              {/* <Tooltip /> */}
              <Legend width={100} verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
            </PieChart>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
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

export default RechartsExample;