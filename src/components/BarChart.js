import * as React from 'react';

import { Line, LineChart, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts";
import { isMobile } from 'react-device-detect';

const RechartsExample = (props) => {
  const [tmpData, setTmpData] = React.useState(props.dayData);
  React.useEffect(() => {
    const sampleData = props.dayData.map(day => {
      return ({date: day.date,  value: day.addressArray.length})
    });
    setTmpData(sampleData);
  },[props]);

  return (
    <div style={{ marginTop: "10px" }}>
      <BarChart width={isMobile ? 300 : 400} height={isMobile ? 200 : 250} data={tmpData} >
        <XAxis dataKey="date" fontSize={isMobile ? "8px" : "8px"} />
        <YAxis width={isMobile ? 30 : 40} fontSize={isMobile ? "10px" : "11px"}/>
        {/* <Tooltip /> */}
        <Bar dataKey="value" barSize={15} fill="#BD9816"/>
      </BarChart>
      <div style={{ textAlign: "left" }}>
        총 임장수는~
      </div>
    </div>   
  );
};

export default RechartsExample;