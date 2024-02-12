import React, { useState, useEffect } from 'react';
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
import { isMobile } from 'react-device-detect';
import { LeakRemoveTwoTone } from '@mui/icons-material';

const MyListItem = styled(ListItem)(
  ({ theme }) => ({
    backgroundColor: theme.colors.colorMain,
    color: theme.colors.colorMainFont,
    border: "1px groove",
    borderRadius: "20px", 
    borderColor: theme.colors.colorDarkGray, 
    marginBottom: "8px",
    height: isMobile === true ? '8vh' : '10%', 
  })
);

const MyOpenInNewIcon = styled(OpenInNewIcon)(
  ({ theme }) => ({
    color: theme.colors.colorMainFont
  })
);

const MyDeleteIcon = styled(DeleteIcon)(
  ({ theme }) => ({
    color: theme.colors.colorDarkGold
  })
);

const test = {
  color: "gray",
  fontSize: "12px"
}

const List = ({ item, handleOpenDialog }) => {
  const navigate = useNavigate();
  const selectItem = () => {
    navigate('/details/'+item.id);
  };
  const convertCityName = (name) => {
    try {
      const nameArray = name.split(' ');
      let first = nameArray[0].substr(0, nameArray[0].length-1);
      let second = nameArray[1].substr(0, nameArray[1].length-1);
      return first + ' ' + second;
    } catch (error) {
      return "";
    }
  };

  return (
    <MyListItem
      secondaryAction={
        <>
          <IconButton edge="start" aria-label="delete" onClick={()=>window.open(item.info.naver_bds_url)}>
            <Tooltip title='링크 이동' placement="top">
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
      <ListItemButton onClick={selectItem} style={{ padding: "1px" }}>
        <div style={{ fontSize: "10px", marginRight: "15px", width: "55px", textAlign: "center" }}>{convertCityName(item.info.address)}</div>
        <ListItemText primary={item.title} primaryTypographyProps={{ style: {fontSize: "15px"}}} secondary={item.time.split(' ')[0]} secondaryTypographyProps={{ style: test }}/>
        {/* <MyListItemText primary={item.title} secondary={item.time} /> */}
      </ListItemButton>
    </MyListItem>
  );
}

export default List;
