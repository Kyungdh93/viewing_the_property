import React, { useState, useEffect } from 'react';
import { styled } from "styled-components";
import { PieChart } from '@mui/x-charts/PieChart';
import { isMobile } from 'react-device-detect';

const Report = styled('div')(
  () => ({
    textAlign: "left"
  })
);

const RechartsExample = (props) => {
  const [cityData, setCityData] = useState(props.dayData);
  const [reportContent, setReportContent] = useState('');

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

    setCityData(sampleData);
    for(let i=0; i<tmpArray.length; i++){
      if (Object.keys(tmpObject).includes(tmpArray[i])) {
        tmpObject[tmpArray[i]] = tmpObject[tmpArray[i]] + 1;
      }else {
        tmpObject[tmpArray[i]] = 1;
      }
    }
    
    let resultData = [];
    let idCnt = 0;
    for(const key in tmpObject){
      resultData.push({
        id: idCnt++,
        value: tmpObject[key],
        label: key
      });
    };

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
        result += (data.label + " " + data.value + "건");
        if (index !== (resultData.length-1)) result += ', ';
      });
    }

    result = text + result;
    result += ' 입니다.';
    setReportContent(result);
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
            data: cityData,
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
      <Report>
        {reportContent}
      </Report>
    </>
  );
};

export default RechartsExample;