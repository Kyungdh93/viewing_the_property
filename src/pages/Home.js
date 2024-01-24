import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import ClearIcon from '@mui/icons-material/Clear';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import ListAltIcon from '@mui/icons-material/ListAlt';
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

import { ref, set } from "firebase/database";
import { db } from '../firebase-config';
import { uid } from "uid";

import List from '../components/List';
import Card from '../components/Card';
import Skeleton from '../components/Skeleton';

import { styled } from "styled-components";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  width: '50vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MyButton = styled(Button)(
  ({ theme }) => ({
    backgroundColor: theme.backgroundColor,
    color: theme.buttonColor,
    borderRadius: "20px", 
    "&:hover": {
      background: theme.buttonHoverColor,
    }
  })
);

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
  const dispatch = useDispatch();
   
  let showCount = 0;
  let totalCount = 0;

  const inputRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const lists = useSelector((state) => state.datas);
  const maxCount = useSelector((state) => state.maxCount);
  const [title, setTitle] = React.useState("");
  const [searchData, setSearchData] = React.useState("");
  const [count, setCount] = React.useState({current: 1, total: maxCount});
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
    };

    const nowDate = new Date();
    const time = nowDate.YYYYMMDDHHMMSS();
    // TODO: id, title 중복 체크 필요
    const id = uid();
    dispatch(todoInsert(id, title, time));
    handleClose();
  };

  const deleteItem = (delete_id) => {
    dispatch(todoRemove(delete_id));
    handleCloseDialog();
  };

  const showMore = () => {
    setCount({
      ...count,
      total: count.total + maxCount,
    });
  };

  const foldList = () => {
    setCount({
      ...count,
      total: maxCount,
    });
  };

  return (
    <>
    {
      loading ? (
        <div>Loading...</div>
      ) : (
        <Box sx={{ flexGrow: 1, maxWidth: 1000, marginTop: "10px" }}>
          <Grid container spacing={3}>
            <Grid item xs></Grid>
            {/* <Grid item xs={6}> */}
            <Grid item xs={10}>
              <MyButton fullWidth={true} size="large" variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
                추가하기
              </MyButton>
              <br></br>
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderRadius: "20px", marginTop: "10px" }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  value={searchData}
                  placeholder="검색어를 입력해 주세요."
                  onChange={(e) => setSearchData(e.target.value)}
                />
                {
                  searchData === "" ? (
                    <></>                    
                    ) : (
                    <>
                      <Tooltip title="지우기" placement="bottom">
                        <ClearIcon style={{ cursor: "pointer" }} onClick={() => setSearchData("")}></ClearIcon>
                      </Tooltip>
                      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    </>
                  )
                }
                <Tooltip title={dataType === "list" ? "카드형 목록 보기" : "리스트형 목록 보기" } placement="bottom">
                  <IconButton sx={{ p: '10px' }} aria-label="menu">
                    {
                      dataType === "list" ? (
                          <BorderAllIcon style={{ cursor: "pointer" }} onClick={()=>setType("card")}></BorderAllIcon>
                        ) : (
                          <ListAltIcon style={{ cursor: "pointer" }} onClick={()=>setType("list")}></ListAltIcon>
                      )
                    }
                  </IconButton>
                </Tooltip>
              </Paper>
              <br></br>
              <Box style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", overflow: "hidden" }}>
                { Object.keys(lists).length !== 0 ? (
                  Object.keys(lists).map((item)=>{
                    if (lists[item]['title'].includes(searchData)) {
                      showCount += 1;
                      if (showCount > count.total) return;
                      totalCount += 1;
                      if (dataType === "list") {
                        return <List item={lists[item]} handleOpenDialog={handleOpenDialog} key={`${lists[item]["id"]}`}></List>
                      } else {
                        return <Card item={lists[item]} handleOpenDialog={handleOpenDialog} key={`${lists[item]["id"]}`}></Card>
                      }
                    } else {
                      console.log("ELSE");
                    }
                  })
                ) : (
                  // <h2>텅</h2>
                  <Skeleton></Skeleton>
                )}
              </Box>
              <br></br>
              { showCount > count.total ? (
                <Button fullWidth={true} size="large" style={{ borderRadius: "20px" }} variant="outlined" startIcon={<ExpandMoreIcon />} onClick={showMore}>
                  더보기 ({totalCount}/{showCount})
                </Button>
              ) : Object.keys(lists).length > maxCount ? (
                <Button fullWidth={true} size="large" style={{ borderRadius: "20px" }} variant="outlined" startIcon={<ExpandLessIcon />} onClick={foldList}>
                  접기 ({totalCount}/{totalCount})
                </Button>
              ) : (
                <></>
              )}
            </Grid>
            <Grid item xs></Grid>
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
              <TextField autoFocus required ref={inputRef} fullWidth={true} id="title" label="title" variant="standard" onBlur={(e) => setTitle(e.target.value)} />
              <br></br>
              <br></br>
              {/* <Button size="large" style={{ width: "200px", borderRadius: "20px" }} variant="contained" onClick={Test}> */}
              <Button size="large" style={{ width: "25vw", borderRadius: "20px" }} variant="contained" onClick={Test}>
                확인
              </Button>
              {/* <Button size="large" style={{ width: "200px", borderRadius: "20px" }} variant="outlined" onClick={handleClose}> */}
              <Button size="large" style={{ width: "25vw", borderRadius: "20px" }} variant="outlined" onClick={handleClose}>
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
      )
    }
    </>
  );
}