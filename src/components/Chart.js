import {
    Line,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
  } from "recharts";
  
  const data = [
    {
      name: "1월",
      react: 3,
    },
    {
      name: "2월",
      react: 4,
    },
    {
      name: "3월",
      react: 1,
    },
    {
      name: "4월",
      react: 2,
    },
    {
      name: "5월",
      react: 4,
    },
    {
      name: "6월",
      react: 3,
    },
    {
        name: "7월",    
        react: 3,
    },
    {
        name: "8월",
        react: 3,
    },
    {
        name: "9월",
        react: 3,
    },
    {
        name: "10월",
        react: 3,
    },
    {
        name: "11월",
        react: 3,
    },
    {
        name: "12월",
        react: 3,
    },
  ];
  
  const RechartsExample = () => {
    return (
      <>
        <h1>2024년</h1>
        <LineChart width={600} height={300} data={data}>
          <Line type="linear" dataKey="react" stroke="#0CD3FF" strokeWidth={3} />
          <Line
            type="monotone"
            dataKey="angular"
            stroke="#a6120d"
            strokeWidth={3}
          />
          <Line type="natural" dataKey="vue" stroke="#FFCA29" strokeWidth={3} />
          <CartesianGrid stroke="#ccc" />
          <YAxis />
          <XAxis dataKey="name" />
          <Tooltip />
          <Legend />
        </LineChart>
      </>
    );
  };
  
  export default RechartsExample;