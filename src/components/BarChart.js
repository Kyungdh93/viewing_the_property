import React, { useState, useEffect } from 'react';
import { styled } from "styled-components";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { isMobile } from 'react-device-detect';

const MainDiv = styled('div')(
  () => ({
    marginTop: "10px"
  })
);

const Report = styled('div')(
  () => ({
    textAlign: "left"
  })
);

const Chart = (props) => {
  const [cityData, setCityData] = useState(props.dayData);
  const [reportContent, setReportContent] = useState('');

  useEffect(() => {
    const resultData = props.dayData.map(day => {
      return ({date: day.date,  value: day.addressArray.length})
    });
    setCityData(resultData);
    setReport(resultData);
  },[props]);

  const setReport = (resultData) => {
    let text = '금주 임장 결과는 ';
    let result = '';
    if (resultData.length === 0) {
      result = '0건';
    }else{
      resultData.map((data, index) => {
        result += (data.date + " " + data.value + "건");
        if (index !== (resultData.length-1)) result += ', ';
      });
    }

    result = text + result;
    result += ' 입니다.';
    setReportContent(result);
  };

  return (
    <MainDiv>
      <BarChart width={isMobile ? 300 : 400} height={isMobile ? 200 : 250} data={cityData} >
        <XAxis dataKey="date" fontSize={isMobile ? "8px" : "8px"} />
        <YAxis width={isMobile ? 30 : 40} fontSize={isMobile ? "10px" : "11px"}/>
        {/* <Tooltip /> */}
        <Bar dataKey="value" barSize={15} fill="#BD9816"/>
      </BarChart>
      <Report>
        {reportContent}
      </Report>
    </MainDiv>   
  );
};

export default Chart;