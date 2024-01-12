import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

const lists = [
  {title : "테스트1", sub_title : 1, id : 0}, 
  {title : "테스트2", sub_title : 2, id : 1},
  {title : "테스트3", sub_title : 3, id : 2},
  {title : "테스트4", sub_title : 4, id : 3}
]

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList() {
  const deleteItem = () => {
    console.log("Delete!");
  }

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Avatar with text and icon
          </Typography>
          <Demo>
            {lists.map((it)=>(
              <Link to={`/details/${it.title}`} key={`${it.id}`}>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={deleteItem}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemButton>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Single-line item"
                    secondary='Secondary text'
                  />
                  </ListItemButton>
                </ListItem>,
              </Link>
            ))}
            {/* {generate(
              <Link to={`/details/${2}`}>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={deleteItem}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemButton>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Single-line item"
                    secondary='Secondary text'
                  />
                  </ListItemButton>
                </ListItem>,
              </Link>
            )} */}
          </Demo>
    </Box>
  );
}