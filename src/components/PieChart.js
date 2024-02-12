import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React, { useState, useEffect } from 'react';

import { PieChart } from '@mui/x-charts/PieChart';
import { isMobile } from 'react-device-detect';

const RechartsExample = (props) => {
  const [tmpData, setTmpData] = useState(props.dayData);
  const [tmpReport, setReport] = useState('');

  useEffect(() => {
    let tmpArray = [];
    let cnt = 0;
    const sampleData = props.dayData.map(day => {
      day.addressArray.map(address => {
        if (address !== '') tmpArray.push(address);
      });

      return ({id: cnt++, value: day.addressArray.length, label: "1"})
    });

    let tmpObject = {};

    setTmpData(sampleData);
    console.log('tmpArray = ',tmpArray);
    for(let i=0; i<tmpArray.length; i++){
      if (Object.keys(tmpObject).includes(tmpArray[i])) {
        tmpObject[tmpArray[i]] = tmpObject[tmpArray[i]] + 1;
      }else {
        tmpObject[tmpArray[i]] = 1;
      }
    }
    console.log('tmpObject = ',tmpObject);
    
    let realData = [];
    let idCnt = 0;
    for(const key in tmpObject){
      realData.push({
        id: idCnt++,
        value: tmpObject[key],
        label: key
      });
    };

    setTmpData(realData);
    getReport(realData);

  },[props]);

  const getReport = (realData) => {
    let text = '금주 임장 결과는 ';
    let result = '';
    if (realData.length === 0) {
      result = '0건';
    }else{
      realData.map(data => {
        result += (data.label + " " + data.value + "건, ");
      });
    }

    result = text + result;
    result += ' 입니다.';
    setReport(result);
  };

  return (   
    <>
    <PieChart
      series={[
        {
          // data: [
          //   { id: 0, value: 10, label: '동대문구' },
          //   { id: 1, value: 15, label: '영등포구' },
          //   { id: 2, value: 20, label: '은평구' },
          //   { id: 3, value: 20, label: '구로구' },
          // ],
          data: tmpData,
          innerRadius: 30,
          outerRadius: 100,
          paddingAngle: 3,
          cornerRadius: 5,
          startAngle: 0,
          endAngle: 360,
          cy: 150,
        },
      ]}
      width={isMobile ? 330 : 410}
      height={280}
    />
    <div style={{ textAlign: "left" }}>
      {tmpReport}
    </div>
    </>
  );
};

export default RechartsExample;