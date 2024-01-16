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
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { todoInsert, todoRemove } from '../store';
import { useDispatch, useSelector } from 'react-redux';

import List from '../components/List';
import Card from '../components/Card';

const StyledLink = styled(Link)`
	width: 1000px;
`;

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

export default function Home() {
  let nextId = React.useRef(100);
  const inputRef = React.useRef(null);
  const lists = useSelector((state) => state.datas);
  const search_data = useSelector((state) => state.search_data);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [open_dialog, setOpenDialog] = React.useState([false, ""]);
  const [title, setTitle] = React.useState("");
  const [sub_title, setSubTitle] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);  
  const handleOpenDialog = (id) => setOpenDialog([true, id]);
  const handleCloseDialog = () => setOpenDialog(false);  
  const Test = () => {
    if (title === "") {
      document.getElementById('title').focus();
      return;
    }
    dispatch(todoInsert(nextId.current, title, sub_title));
    nextId.current += 1;
    handleClose();
  }

  const deleteItem = (delete_id) => {
    dispatch(todoRemove(delete_id));
    handleCloseDialog();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth={true} size="large" style={{ borderRadius: "20px" }} variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
            추가하기
          </Button>
          <Demo>
            { lists.length !== 0 ? (
              lists.map((item)=>{
                if (item.title.includes(search_data))
                  // return <List item={item} handleOpenDialog={handleOpenDialog} key={`${item.id}`}></List>
                  return <Card item={item} handleOpenDialog={handleOpenDialog} key={`${item.id}`}></Card>
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
              <Button size="large" style={{ width: "200px", borderRadius: "20px" }} variant="contained" onClick={Test}>
                확인
              </Button>
              <Button size="large" style={{ width: "200px", borderRadius: "20px" }} variant="outlined" onClick={handleClose}>
                취소
              </Button>
            </Box>
          </Modal>
        </Grid>
        <Grid item xs>
        </Grid>
      </Grid>
      <Dialog
        open={open_dialog[0]}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title">
        {"Delete item"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Really??
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button size="large" style={{ width: "200px", borderRadius: "20px" }} color="error" variant="contained" onClick={()=>deleteItem(open_dialog[1])}>
          삭제
        </Button>
        <Button size="large" style={{ width: "200px", borderRadius: "20px" }} color="error" variant="outlined" onClick={handleCloseDialog}>
          취소
        </Button>
      </DialogActions>
      </Dialog>
    </Box>
  );
}