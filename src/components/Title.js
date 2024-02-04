import * as React from 'react';
import Typography from '@mui/material/Typography';
import { styled } from "styled-components";

const MyDiv = styled('div')(
  ({ theme }) => ({
    marginBottom: "10px", 
    color: theme.colors.colorDarkGray,
    textAlign: "left",
    marginLeft: "10px",
  })
);

const Title = (props) => {
  return (
    <MyDiv>
      <Typography variant="h5" sx={{fontFamily:"YeongdeokSnowCrab"}}>{props.title}</Typography>
    </MyDiv>
  );
};

export default Title;