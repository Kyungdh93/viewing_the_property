import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import * as React from 'react';

import { PieChart } from '@mui/x-charts/PieChart';
import { isMobile } from 'react-device-detect';

const RechartsExample = (props) => {
  const [tmpData, setTmpData] = React.useState(props.dayData);
  React.useEffect(() => {
    let tmpArray = [];
    let cnt = 0;
    const sampleData = props.dayData.map(day => {
      day.addressArray.map(address => {
        tmpArray.push(address);
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
        
      }
    }
    let count = tmpArray.filter(element => '서울시 구로구' === element).length;
    console.log('count = ',count);
    
  },[props]);

  return (      
    <PieChart
    series={[
      {
        // data: [
        //   { id: 0, value: 10, label: '동대문구' },
        //   { id: 1, value: 15, label: '영등포구' },
        //   { id: 2, value: 20, label: '은평구' },
        //   { id: 3, value: 20, label: '구로구' },
        //   { id: 4, value: 2, label: '금천구' },
        //   { id: 5, value: 12, label: '강남구' },
        //   { id: 6, value: 13, label: '서대문구' },
        //   { id: 7, value: 20, label: '기타' },
        // ],
        data: props.dayData,
        innerRadius: 30,
        outerRadius: 100,
        paddingAngle: 3,
        cornerRadius: 5,
        startAngle: 0,
        endAngle: 360,
        cy: 150,
      },
    ]}
    width={isMobile ? 330 : 400}
    height={280}
  />
  );
};

export default RechartsExample;