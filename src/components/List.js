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
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import { todoInsert } from '../store';
import { useDispatch, useSelector } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList() {
  let nextId = React.useRef(100);
  const inputRef = React.useRef(null);
  const lists = useSelector((state) => state.datas);
  const search_data = useSelector((state) => state.search_data);
  console.log("lists = ", lists)
  console.log("search_data = ", search_data)

  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [sub_title, setSubTitle] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);  
  const Test = () => {
    if (title === "") {
      document.getElementById('title').focus();
      return;
    }
    dispatch(todoInsert(nextId.current, title, sub_title));
    nextId.current += 1;
    handleClose();
  }

  const deleteItem = () => {
    console.log("Delete!");
  }

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Button fullWidth={true} size="large" style={{ borderRadius: "20px" }} variant="outlined" startIcon={<AddIcon />} onClick={handleOpen}>
        추가하기
      </Button>
      <Demo>
        { lists.length !== 0 ? (
          lists.map((item)=>{
            if (item.title.includes(search_data))
              return <Link to={`/details/${item.title}`} key={`${item.id}`}>
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
                    primary={item.title}
                    secondary={item.sub_title}
                  />
                  </ListItemButton>
                </ListItem>,
              </Link>
          })
        ) : (
          <h2>텅</h2>
        )}
      </Demo>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            제목!
          </Typography>
          <br></br>
          <TextField autoFocus required ref={inputRef} id="title" label="title" variant="standard" onBlur={(e) => setTitle(e.target.value)} />
          <br></br>
          <TextField id="sub_title" label="sub_title" variant="standard" onBlur={(e) => setSubTitle(e.target.value)} />
          <br></br>
          <br></br>
          <Button size="large" style={{ width: "200px", borderRadius: "20px" }} variant="outlined" onClick={Test}>
            확인
          </Button>
          <Button size="large" style={{ width: "200px", borderRadius: "20px" }} color="error" variant="outlined" onClick={handleClose}>
            취소
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}