import * as React from 'react';
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
	width: 1000px;
`;

const List = ({ item, handleOpenDialog }) => {

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={()=>handleOpenDialog(item.id)}>
          <DeleteIcon />
        </IconButton>
      }
      style={{ border: "1px outset", borderRadius: "20px" }}
    >
      <StyledLink to={`/details/${item.title}`}>
        <ListItemButton>
          <ListItemAvatar>
            <HomeIcon color="primary" />
          </ListItemAvatar>
        <ListItemText primary={item.title} secondary={item.time} />
        </ListItemButton>
    </ListItem>
  );
}

export default List;
