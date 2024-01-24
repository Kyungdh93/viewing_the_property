import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import Tooltip from '@mui/material/Tooltip';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { useNavigate } from 'react-router-dom';

import { styled } from "styled-components";

const MyListItem = styled(ListItem)(
  ({ theme }) => ({
    backgroundColor: theme.colors.colorMain,
    color: theme.colors.colorGray,
    border: "1px outset",
    borderRadius: "20px", 
    borderColor: theme.colors.colorDarkGray, 
    height: "10%",
    // height: "10vh",
  })
);

const MyOpenInNewIcon = styled(OpenInNewIcon)(
  ({ theme }) => ({
    color: theme.colors.colorGreen
  })
);

const MyDeleteIcon = styled(DeleteIcon)(
  ({ theme }) => ({
    color: theme.colors.colorGray
  })
);

const test = {
  color: "white"
}

const List = ({ item, handleOpenDialog }) => {
  const navigate = useNavigate();
  const selectItem = () => {
    navigate('/details/'+item.id);
  }

  return (
    <MyListItem
      secondaryAction={
        <>
          <IconButton edge="start" aria-label="delete" onClick={()=>window.open(item.info.naver_bds_url)}>
            <Tooltip title='네이버 부동산으로 이동' placement="top">
              <MyOpenInNewIcon/>
            </Tooltip> 
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={()=>handleOpenDialog(item.id)}>
            <Tooltip title='삭제' placement="top">
              <MyDeleteIcon/>
            </Tooltip>
          </IconButton>
        </>
      }
    >
      <ListItemButton onClick={selectItem}>
        <ListItemAvatar>
          <HomeIcon />
        </ListItemAvatar>
        <ListItemText primary={item.title} secondary={item.time} secondaryTypographyProps={{ style: test }}/>
        {/* <MyListItemText primary={item.title} secondary={item.time} /> */}
      </ListItemButton>
    </MyListItem>
  );
}

export default List;
