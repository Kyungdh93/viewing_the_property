import React, { useState, useEffect } from 'react';
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
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TuneIcon from '@mui/icons-material/Tune';
import Badge from '@mui/material/Badge';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import { todoInsert, todoRemove, setAllData, filterUpdate } from '../store';
import { useDispatch, useSelector } from 'react-redux';

import { isMobile } from 'react-device-detect';

import { ref, child, get } from "firebase/database";
import { db } from '../firebase-config';
import { uid } from "uid";

import List from '../components/HomeList';
import Card from '../components/HomeCard';
import Skeleton from '../components/Skeleton';
import Filter from '../components/Filter';
import Title from '../components/Title';
import { styled } from "styled-components";

const MyBox = styled(Box)(
  () => ({
    flexGrow: 1, 
    margin: "auto", 
    maxWidth: 1000, 
    marginTop: isMobile ? "10px" : "70px"
  })
);

const MyButton = styled(Button)(
  ({ theme }) => ({
    color: theme.colors.colorMainFont,
    borderColor: theme.colors.colorDarkGray,
    borderRadius: "20px", 
    "&:hover": {
      background: theme.colors.colorMain,
      borderColor: theme.colors.colorMainFont,
    }
  })
);

const MyDivider = styled(Divider)(
  ({ theme }) => ({
    backgroundColor: theme.colors.colorMainFont,
    height: 28, 
    margin: 0.5, 
    marginRight: 10,
  })
);

const SearchBar = styled(InputBase)(
  ({ theme }) => ({
    color: theme.colors.colorMainFont,
    borderRadius: "10px", 
  })
);

const SearchPaper = styled(Paper)(
  ({ theme }) => ({
    backgroundColor: theme.colors.colorMain,
    color: theme.colors.colorMainFont,
    // borderColor: theme.colors.colorDarkGray,
    borderRadius: "20px",
    height: isMobile === true ? '8vh' : '60px', 
    p: '2px 4px', 
    display: 'flex', 
    alignItems: 'center', 
    marginTop: "10px"
  })
);

const MyBorderAllIcon = styled(BorderAllIcon)(
  ({ theme }) => ({
    color: theme.colors.colorDarkGray,
  })
);

const MyListAltIcon = styled(ListAltIcon)(
  ({ theme }) => ({
    color: theme.colors.colorDarkGray,
  })
);

const MySearchIcon = styled(SearchIcon)(
  ({ theme }) => ({
    color: theme.colors.colorDarkGray,
    marginRight: "7px", 
  })
);

const MyClearIcon = styled(ClearIcon)(
  ({ theme }) => ({
    color: theme.colors.colorDarkGray,
    cursor: "pointer", 
    marginRight: "7px", 
  })
);

const MyTuneIcon = styled(TuneIcon)(
  ({ theme }) => ({
    color: theme.colors.colorDarkGray,
    cursor: "pointer", 
  })
);

const MyFilter = styled(Button)(
  ({ theme }) => ({
    color: theme.colors.colorMainFont,
    borderColor: theme.colors.colorDarkGray,
    borderRadius: "20px", 
    "&:hover": {
      background: theme.colors.colorMain,
      borderColor: theme.colors.colorMainFont,
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
  const [loading, setLoading] = useState(true);
  // const loading = useSelector((state) => state.loading);
  const lists = useSelector((state) => state.datas);
  const maxCount = useSelector((state) => state.maxCount);
  const filterArray = useSelector((state) => state.filterArray);
  const [title, setTitle] = useState("");
  const [searchData, setSearchData] = useState("");
  const [count, setCount] = useState({current: 1, total: maxCount});
  const [dataType, setType] = useState("list");
  const [open_modal, setOpenModal] = useState(false);
  const [open_dialog, setOpenDialog] = useState([false, ""]);
  const [openFilter, setOpenFilter] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);  

  const handleOpenDialog = (id) => setOpenDialog([true, id]);
  const handleCloseDialog = () => setOpenDialog([false, ""]);  

  const handleOpenFilter = () => setOpenFilter(true);  
  const handleCloseFilter = () => setOpenFilter(false);  
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

  const getDataFromDatabase = () => {
    const dbRef = ref(db);
      get(child(dbRef, "/datas"))
        .then(snapshot => {
        if (snapshot.exists()) {
          dispatch(setAllData(snapshot.val()));
          console.log(snapshot.val());
          setLoading(false);
        } else {
          console.log("No data available");
          // 에러 화면
        }
      })
      .catch(error => {
        console.error(error);
        // 에러 화면
      });
  };

  const initFilter = () => {
    dispatch(filterUpdate([]));
  };

  useEffect(() => {
    const runFunction = Object.keys(lists).length === 0 ? getDataFromDatabase() : setLoading(false);
  },[]);

  return (
    <>
    {
      loading ? (
        <>
          <Skeleton></Skeleton>
        </>
      ) : (
        <MyBox>
          <Grid container spacing={3}>
            <Grid item xs></Grid>
            <Grid item xs={isMobile ? 12 : 11}>
              <Title title='홈'></Title>
              <SearchPaper
                component="form"
              >
                <SearchBar
                  sx={{ ml: 1, flex: 1 }}
                  value={searchData}
                  startAdornment={<MySearchIcon/>}
                  placeholder="검색어를 입력해 주세요."
                  onChange={(e) => setSearchData(e.target.value)}
                />
                {
                  searchData === "" ? (
                    <></>                    
                    ) : (
                    <>
                      <Tooltip title="지우기" placement="bottom">
                        <MyClearIcon onClick={() => setSearchData("")}></MyClearIcon>
                      </Tooltip>
                      <MyDivider orientation="vertical" />
                    </>
                  )
                }
                <Badge badgeContent={filterArray.length} color="secondary">
                  <MyTuneIcon onClick={handleOpenFilter}></MyTuneIcon>
                </Badge>
                <Tooltip title={dataType === "list" ? "카드형 목록 보기" : "리스트형 목록 보기" } placement="bottom">
                  <IconButton sx={{ p: '10px' }} aria-label="menu">
                    {
                      dataType === "list" ? (
                          <MyBorderAllIcon onClick={()=>setType("card")}></MyBorderAllIcon>
                        ) : (
                          <MyListAltIcon onClick={()=>setType("list")}></MyListAltIcon>
                      )
                    }
                  </IconButton>
                </Tooltip>
              </SearchPaper>
              <br></br>
              <Box style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", overflow: "hidden" }}>
                { Object.keys(lists).length !== 0 ? (
                  Object.keys(lists).map((item)=>{
                    if (filterArray.length === 0 || filterArray.includes(lists[item]['info']['address'])) {
                      if (lists[item]['title'].includes(searchData)) {
                        showCount += 1;
                        if (showCount > count.total) return;
                        totalCount += 1;
                        if (dataType === "list") {
                          return <List item={lists[item]} handleOpenDialog={handleOpenDialog} key={`${lists[item]["id"]}`}></List>
                        } else {
                          return <Card item={lists[item]} handleOpenDialog={handleOpenDialog} key={`${lists[item]["id"]}`}></Card>
                        }
                      }
                    }
                  })
                ) : (
                  <h2>텅</h2>
                )}
              </Box>
              <br></br>
              { showCount > count.total ? (
                <MyButton fullWidth={true} size="large" style={{ borderRadius: "20px" }} variant="outlined" startIcon={<ExpandMoreIcon />} onClick={showMore}>
                  더보기 ({totalCount}/{showCount})
                </MyButton>
              ) : Object.keys(lists).length > maxCount ? (
                <MyButton fullWidth={true} size="large" style={{ borderRadius: "20px" }} variant="outlined" startIcon={<ExpandLessIcon />} onClick={foldList}>
                  접기 ({totalCount}/{totalCount})
                </MyButton>
              ) : (
                <></>
              )}
            </Grid>
            <Grid item xs></Grid>
          </Grid>

          <Dialog
            open={open_modal}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">
            {"제목을 입력해주세요"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <TextField autoFocus required ref={inputRef} fullWidth={true} id="title" color="success" variant="standard" onBlur={(e) => setTitle(e.target.value)} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button size="large" style={{ width: "200px", borderRadius: "20px" }} color="success" variant="contained" onClick={()=>Test()}>
              확인
            </Button>
            <Button size="large" style={{ width: "200px", borderRadius: "20px" }} color="success" variant="outlined" onClick={handleClose}>
              취소
            </Button>
          </DialogActions>
          </Dialog>

          <Dialog
            open={open_dialog[0]}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              정말로 삭제하시겠습니까?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button size="large" style={{ width: "200px", borderRadius: "20px" }} color="error" variant="contained" onClick={()=>deleteItem(open_dialog[1])}>
              삭제
            </Button>
            <Button size="large" style={{ width: "200px", borderRadius: "20px" }} variant="outlined" onClick={handleCloseDialog}>
              취소
            </Button>
          </DialogActions>
          </Dialog>

          <Dialog
            open={openFilter}
            onClose={handleCloseFilter}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            // fullWidth={true}
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 800, backgroundColor: "white" } }}

          >
          <DialogTitle id="alert-dialog-title">
            <div style={{ textAlign: "right" }}>
              <Button startIcon={<RestartAltIcon></RestartAltIcon>} onClick={initFilter}>초기화
              </Button>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Filter></Filter>
            </DialogContentText>
          </DialogContent>
          </Dialog>

          <div style={{position: "fixed", right: "5%", top: "80%", zIndex: "1000" }}>
            <MyButton variant="outlined" startIcon={<AddIcon />} onClick={handleOpen}>
              추가하기
            </MyButton>
          </div>
        </MyBox>
      )
    }
    </>
  );
}