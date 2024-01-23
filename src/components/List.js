import * as React from 'react';
import { styled } from '@mui/material/styles';
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

const List = ({ item, handleOpenDialog }) => {
  const navigate = useNavigate();
  const selectItem = () => {
    navigate('/details/'+item.id);
  }

  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton edge="start" aria-label="delete" onClick={()=>window.open(item.info.naver_bds_url)}>
            <Tooltip title='네이버 부동산으로 이동' placement="top">
              <OpenInNewIcon style={{ cursor: "pointer" }} color="success" ></OpenInNewIcon>
            </Tooltip> 
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={()=>handleOpenDialog(item.id)}>
            <Tooltip title='삭제' placement="top">
              <DeleteIcon style={{ cursor: "pointer" }} ></DeleteIcon>
            </Tooltip>
          </IconButton>
        </>
      }
      style={{ border: "1px outset", borderRadius: "20px", height: "10vh" }}
    >
      <ListItemButton onClick={selectItem}>
        <ListItemAvatar>
          <HomeIcon />
        </ListItemAvatar>
        <ListItemText primary={item.title} secondary={item.time} />
      </ListItemButton>
    </ListItem>
  );
}

export default List;
