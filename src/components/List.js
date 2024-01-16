import * as React from 'react';
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const List = ({ item, handleOpenDialog }) => {
  const navigate = useNavigate();
  const selectItem = () => {
    navigate('/details/'+item.id);
  }

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={()=>handleOpenDialog(item.id)}>
          <DeleteIcon />
        </IconButton>
      }
      style={{ border: "1px outset", borderRadius: "20px" }}
    >
      <ListItemButton onClick={selectItem}>
        <ListItemAvatar>
          <HomeIcon color="primary" />
        </ListItemAvatar>
        <ListItemText primary={item.title} secondary={item.time} />
      </ListItemButton>
    </ListItem>
  );
}

export default List;
