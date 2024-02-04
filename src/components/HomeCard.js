import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import { CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { styled } from "styled-components";
import { isMobile } from 'react-device-detect';

const MyCard = styled(Card)(
  ({ theme }) => ({
    width: isMobile === true ? '50%' : '33%', 
    maxWidth: 500,
    backgroundColor: theme.colors.colorMain,
    color: theme.colors.colorMainFont,
  })
);

const MyOpenInNewIcon = styled(OpenInNewIcon)(
  ({ theme }) => ({
    color: theme.colors.colorMainFont,
    cursor: "pointer",
    marginRight: "10px"
  })
);

const MyDeleteIcon = styled(DeleteIcon)(
  ({ theme }) => ({
    color: theme.colors.colorDarkGold,
    cursor: "pointer",
  })
);

const TitleDiv = styled(Typography)(
  ({ theme }) => ({
    fontSize: isMobile === true ? '14px' : '17px', 
    // backgroundColor: theme.colors.colorMain,
    color: theme.colors.colorMainFont,
  })
);

const CardComponent = ({ item, handleOpenDialog }) => {
  const navigate = useNavigate();
  const selectItem = () => {
    navigate('/details/'+item.id);
  }

  return (
    <MyCard>
      <CardActionArea onClick={selectItem}>
        <CardMedia
          component="img"
          height="140"
          // image={require("../home.jpg")}
          image='https://images.unsplash.com/photo-1522770179533-24471fcdba45'
          alt="home"
        />
        <CardContent>
          <TitleDiv>
            {item.title}
          </TitleDiv>
          <Typography variant="body2">
            {item.time.split(' ')[0]}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <div style={{ marginLeft: "auto" }}>
          <Tooltip title='링크 이동' placement="top">
            <MyOpenInNewIcon onClick={()=>window.open(item.info.naver_bds_url)}></MyOpenInNewIcon>
          </Tooltip>
          <Tooltip title='삭제' placement="top">
          <MyDeleteIcon onClick={()=>handleOpenDialog(item.id)}></MyDeleteIcon>
          </Tooltip>
        </div>
      </CardActions>
    </MyCard>
  );
}

export default CardComponent;