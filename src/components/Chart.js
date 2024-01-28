import {
    Line,
    LineChart,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
  } from "recharts";
  
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
      건수: 3,
    },
    {
      name: "동작구",
      건수: 4,
    },
    {
      name: "용산구",
      건수: 7,
    },
    {
      name: "강남구",
      건수: 1,
    },
    {
      name: "강서구",
      건수: 3,
    },
    {
      name: "동대문구",
      건수: 2,
    },
    {
      name: "성북구",
      건수: 5,
    },
    {
      name: "구로구",
      건수: 4,
    },
  ];
  
  const RechartsExample = () => {
    return (
      <>
        <h1>2024년</h1>
        <LineChart width={600} height={300} data={sampleData1}>
          <Line type="linear" dataKey="서울" stroke="#0CD3FF" strokeWidth={3} />
          <Line type="monotone" dataKey="경기" stroke="#a6120d" strokeWidth={3} />
          <Line type="natural" dataKey="인천" stroke="#FFCA29" strokeWidth={3} />
          <CartesianGrid stroke="#ccc" />
          <YAxis />
          <XAxis dataKey="name" />
          <Tooltip />
          <Legend />
        </LineChart>
        <br></br>
        <h1>2024년 3월</h1>
        <BarChart width={730} height={250} data={sampleData2}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="건수" fill="#8884d8" />
          {/* <Bar dataKey="경기" fill="#82ca9d" /> */}
        </BarChart>
      </>
    );
  };
  
  export default RechartsExample;