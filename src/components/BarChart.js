import React, { useState, useEffect } from 'react';
import { styled } from "styled-components";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { isMobile } from 'react-device-detect';

const MainDiv = styled('div')(
  () => ({
    marginTop: "10px"
  })
);

const SubDiv = styled('div')(
  () => ({
    textAlign: "left"
  })
);

const Chart = (props) => {
  const [tmpData, setTmpData] = useState(props.dayData);
  useEffect(() => {
    const sampleData = props.dayData.map(day => {
      return ({date: day.date,  value: day.addressArray.length})
    });
    setTmpData(sampleData);
  },[props]);

  return (
    <MainDiv>
      <BarChart width={isMobile ? 300 : 400} height={isMobile ? 200 : 250} data={tmpData} >
        <XAxis dataKey="date" fontSize={isMobile ? "8px" : "8px"} />
        <YAxis width={isMobile ? 30 : 40} fontSize={isMobile ? "10px" : "11px"}/>
        {/* <Tooltip /> */}
        <Bar dataKey="value" barSize={15} fill="#BD9816"/>
      </BarChart>
      <SubDiv>
        총 임장수는~
      </SubDiv>
    </MainDiv>   
  );
};

export default Chart;