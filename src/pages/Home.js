import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

import BorderAllIcon from '@mui/icons-material/BorderAll';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ListAltTwoToneIcon from '@mui/icons-material/ListAltTwoTone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
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
  let showCount = 0;
  let totalCount = 0;

  let nextId = React.useRef(100);
  const inputRef = React.useRef(null);
  const lists = useSelector((state) => state.datas);
  const max_count = useSelector((state) => state.maxCount);
  // const search_data = useSelector((state) => state.search_data);
  const dispatch = useDispatch();
  const [title, setTitle] = React.useState("");
  const [searchData, setSearchData] = React.useState("");
  const [count, setCount] = React.useState({current: 1, total: max_count});
  const [dataType, setType] = React.useState("list");
  const [open_modal, setOpenModal] = React.useState(false);
  const [open_dialog, setOpenDialog] = React.useState([false, ""]);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);  
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
      total: count.total + max_count,
    });
  }

  const foldList = () => {
    setCount({
      ...count,
      total: max_count,
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
          <br></br>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 450, borderRadius: "20px" }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search google maps' }}
              onKeyUp={(e) => setSearchData(e.target.value)}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton sx={{ p: '10px' }} aria-label="menu">
              {
                dataType === "list" ? (
                  <BorderAllIcon style={{ cursor: "pointer" }} onClick={()=>setType("card")}></BorderAllIcon>
                  ) : (
                  <ListAltIcon style={{ cursor: "pointer" }} onClick={()=>setType("list")}></ListAltIcon>
                )
              }
            </IconButton>
          </Paper>
          <br></br>
          <Demo className='abc' style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", overflow: "hidden" }}>
            { lists.length !== 0 ? (
              lists.map((item)=>{
                if (item.title.includes(searchData)) {
                  showCount += 1;
                  if (showCount > count.total) return;
                  totalCount += 1;
                  if (dataType === "list") {
                    return <List item={item} handleOpenDialog={handleOpenDialog} key={`${item.id}`}></List>
                  } else {
                    return <Card item={item} handleOpenDialog={handleOpenDialog} key={`${item.id}`}></Card>
                  }
                } else {
                  console.log("ELSE");
                }
              })
            ) : (
              <h2>텅</h2>
            )}
          </Demo>
          <br></br>
          { showCount > count.total ? (
            <Button fullWidth={true} size="large" style={{ borderRadius: "20px" }} variant="outlined" startIcon={<ExpandMoreIcon />} onClick={showMore}>
              더보기 ({totalCount}/{showCount})
            </Button>
          ) : lists.length > max_count ? (
            <Button fullWidth={true} size="large" style={{ borderRadius: "20px" }} variant="outlined" startIcon={<ExpandLessIcon />} onClick={foldList}>
              접기 ({totalCount}/{totalCount})
            </Button>
          ) : (
            <></>
          )}
        </Grid>
        <Grid item xs>
        </Grid>
      </Grid>

      <Modal
        open={open_modal}
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