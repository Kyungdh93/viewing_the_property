import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Button from '@mui/material/Button';
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

Date.prototype.YYYYMMDDHHMMSS = function () {
  var yyyy = this.getFullYear().toString();
  var MM = pad(this.getMonth() + 1,2);
  var dd = pad(this.getDate(), 2);
  var hh = pad(this.getHours(), 2);
  var mm = pad(this.getMinutes(), 2)
  var ss = pad(this.getSeconds(), 2)

  return yyyy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss;
};

function pad(number, length) {
  var str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}

export default function Home() {
  let nextId = React.useRef(100);
  const inputRef = React.useRef(null);
  const lists = useSelector((state) => state.datas);
  const search_data = useSelector((state) => state.search_data);
  const dispatch = useDispatch();
  const [count, setCount] = React.useState({current: 1, total: 5});
  const [data_type, setType] = React.useState("list");
  const [open, setOpen] = React.useState(false);
  const [open_dialog, setOpenDialog] = React.useState([false, ""]);
  const [title, setTitle] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);  
  const handleOpenDialog = (id) => setOpenDialog([true, id]);
  const handleCloseDialog = () => setOpenDialog([false, ""]);  
  const Test = () => {
    if (title === "") {
      document.getElementById('title').focus();
      return;
    }

    const nowDate = new Date();
    const time = nowDate.YYYYMMDDHHMMSS();
    dispatch(todoInsert(nextId.current, title, time));
    nextId.current += 1;
    handleClose();
  }

  const deleteItem = (delete_id) => {
    dispatch(todoRemove(delete_id));
    handleCloseDialog();
  }

  const showMore = () => {
    setCount({
      ...count,
      total: count.total+5,
    });
  }

  const foldList = () => {
    setCount({
      ...count,
      total: 5,
    });
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
          <ListAltIcon style={{ cursor: "pointer", fontSize: "40px" }} onClick={()=>setType("list")}></ListAltIcon>
          <BorderAllIcon style={{ cursor: "pointer", fontSize: "40px" }} onClick={()=>setType("card")}></BorderAllIcon>
          <Demo>
            { lists.length !== 0 ? (
              lists.map((item, index)=>{
                if (item.title.includes(search_data)) {
                  if (data_type === "list") {
                    if (index >= count.total) {
                      return;
                    } else {
                    return <List item={item} handleOpenDialog={handleOpenDialog} key={`${item.id}`}></List>
                    }
                  } else {
                    if (index >= Math.ceil(count.total/2)) {
                      return;
                  } else {
                    return <Card item={item} handleOpenDialog={handleOpenDialog} key={`${item.id}`}></Card>
                    }
                  }
                }
              })
            ) : (
              <h2>텅</h2>
            )}
          </Demo>
          <br></br>
          { lists.length > count.total ? (
            <Button fullWidth={true} size="large" style={{ borderRadius: "20px" }} variant="outlined" onClick={showMore}>
              더보기
            </Button>
          ) : (
            <Button fullWidth={true} size="large" style={{ borderRadius: "20px" }} variant="outlined" onClick={foldList}>
              접기
            </Button>
          )}
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