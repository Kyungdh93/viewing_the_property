import * as React from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

import { isMobile } from 'react-device-detect';

import Title from '../components/Title';
import DetailsList from '../components/DetailsList';
import { styled } from "styled-components";

const MyBox = styled(Box)(
  () => ({
    flexGrow: 1, 
    // width: isMobile === true ? '100vw' : '1000px',
    maxWidth: isMobile ? 320 : 1000, 
    minWidth: 320, 
    margin: isMobile? "" : "auto",
    marginTop: isMobile ? "" : "70px",
  })
);

const Details = () => {
  const lists = useSelector((state) => state.datas);
  const { item } = useParams();

  const itemData = lists[item];
  const nowYear = new Date().getFullYear();
  const naverLandUrl = 'https://land.naver.com';
  const mappingData = {
    "expected_price": ["예상 매매가", "input"],
    "expected_rent_price": ["예상 전세가", "input"],
    "address": ["주소", "input"],
    "year_of_construction": ["시공년도", "input"],
    "number_of_households": ["세대수", "input"],
    "parking": ["주차", "input"],
    "subway": ["지하철", "input"],
    "bus": ["버스", "input"],
    "school": ["학교", "checkbox"],
    "entrance_structure": ["현관구조", "radio"],
    "heating": ["난방", "radio"],
    "management_status": ["관리상태", "radio"],
    "naver_bds_url": ["URL", "input"],
    "memo": ["메모", "textarea"]
  };

  const orderArray = ["expected_price",  "expected_rent_price",  "address",  "year_of_construction",  "number_of_households",  "parking",  "subway",  "bus",  "school",  "entrance_structure",  "heating",  "management_status",  "naver_bds_url",  "memo"];
  
  return (
    <MyBox>
      <Grid container spacing={3}>
       <Grid item xs></Grid>
        <Grid item xs={isMobile ? 12 : 11}>
          <Title title={`상세 - ${itemData.title}`}></Title>
          <DetailsList mappingData={mappingData} orderArray={orderArray} nowYear={nowYear} naverLandUrl={naverLandUrl}></DetailsList>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </MyBox>
  );
}

export default Details;
