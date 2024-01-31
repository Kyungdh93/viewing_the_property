import * as React from 'react';

import { useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Tooltip from '@mui/material/Tooltip';

import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { todoUpdate, greaterSeoul, seoulCities, gyeonggidoCities } from '../store';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';

import Box from '@mui/material/Box';
import Textarea from '@mui/joy/Textarea';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Modal from '@mui/material/Modal';
import { isMobile } from 'react-device-detect';

import { styled } from "styled-components";
import ImageUpload from "./ImageUpload";

import CheckBox from "./CheckBox";

const MyList = styled(List)(
  () => ({
    width: isMobile === true ? '100vw' : '50%', 
    maxWidth: isMobile === true ? 320 : 1000,
    margin: "auto",
  })
);

const MyOutlinedInput = styled(OutlinedInput)(
  ({ theme }) => ({
    borderRadius: "10px",
    width: isMobile === true ? '63vw' : '300px', 
    color: theme.colors.colorMainFont,
    "& .MuiOutlinedInput-notchedOutline" : {
      borderColor : theme.colors.colorDarkGray
    },
    "&:hover > .MuiOutlinedInput-notchedOutline" : {
      borderColor : theme.colors.colorMainFont,
      color: "white"
    },
    "&.Mui-focused > .MuiOutlinedInput-notchedOutline" : {
      // borderColor : theme.colors.colorMainFont,
      borderColor : theme.colors.colorBlue,
      color: "white"
    }
  })
);

const MyInputAdornment = styled('div')(
  ({ theme }) => ({
    color: theme.colors.colorMainFont,
    fontSize: "13px",
  })
);

const StartInputAdornment = styled(MyInputAdornment)(
  () => ({
    width: "65px",
    textAlign: "left",
  })
);

const StartInputAdornmentForAddress = styled(StartInputAdornment)(
  () => ({
    width: "185px",
    marginRight: "1px",
    cursor: "pointer"
  })
);

const StartInputAdornmentForParking = styled(StartInputAdornment)(
  () => ({
    width: "200px"
  })
);

const EndInputAdornment = styled(MyInputAdornment)(
  () => ({
    width: "35px",
    marginLeft: "3px",
    textAlign: "right",
  })
);

const MyButton = styled(Button)(
  ({ theme }) => ({
    backgroundColor: theme.colors.colorMain,
    color: theme.colors.colorMainFont,
    borderColor: theme.colors.colorDarkGray,
    borderRadius: "20px", 
    "&:hover": {
      background: theme.colors.colorDarkShadow,
      borderColor: theme.colors.colorWhite,
    }
  })
);

const MyTextarea = styled(Textarea)(
  ({ theme }) => ({
    width: isMobile === true ? '63vw' : '300px', 
    height: "120px", 
    borderRadius: "10px", 
    backgroundColor: theme.colors.colorBg,
    color: theme.colors.colorMainFont,
    borderColor: theme.colors.colorDarkGray,
    // "&.Mui-focused" : {
    //   borderColor : theme.colors.colorMainFont,
    //   color: "white"
    // },
  })
);

const MyImage = styled('img')(
  ({ theme }) => ({
    width: isMobile === true ? '400px' : '1000px', 
    height: isMobile === true ? '500px' : '700px', 
  })
);

const MyDivider = styled(Divider)(
  ({ theme }) => ({
    backgroundColor: theme.colors.colorGray,
    height: 1, 
    margin: 1,
  })
);

const useImageLoaded = () => {
  const [loaded, setLoaded] = React.useState(false);
  const ref = React.useRef();
  const onLoad = () => {
    setLoaded(true);
  }

  React.useEffect(() => {
    if (ref.current && ref.current.complete) {
      onLoad()
    }
  })

  return [ref, loaded, onLoad]
}

function DetailsList(props) {
  const [ref, loaded, onLoad] = useImageLoaded()

  const dispatch = useDispatch();
  const { item } = useParams();

  const lists = useSelector((state) => state.datas);
  const itemData = lists[item];
//   console.log('itemData = ', itemData);

  const [expectedPrice, setExpectedPrice] = React.useState(Number(itemData.info['expected_price']));
  const [expectedRentPrice, setExpectedRentPrice] = React.useState(Number(itemData.info['expected_rent_price']));
  const [calculated, setCalculated] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);
  const mappingData = props.mappingData;
  const orderArray = props.orderArray;
  const nowYear = props.nowYear;
  const naverLandUrl = props.naverLandUrl;

  const calculate = () => {
    let result = (Number((expectedRentPrice).toString().replaceAll(',',''))/Number((expectedPrice).toString().replaceAll(',','')))*100;
    result = result === NaN ? 0 : isFinite(result) ? Math.round(result) : 0;
    setCalculated(result);
  };

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    console.log('handleClose');
    setOpenModal(false);
  };
  const test = (e) => {
    const info = {...itemData.info, ['address']:e.target.value};
    updateValue(e, info);
    handleClose();
  };

  React.useEffect(() => {
    calculate();
  },[]);

  const updateValue = (e, info) => {
    dispatch(todoUpdate(itemData.id, info));
  };

  return (
    <MyList>
        <Typography sx={{textAlign: "center", marginBottom: "10px" }} variant="h6" component="h2">{itemData.title}</Typography>
        <ListItem
        key={8}
        disableGutters
        secondaryAction={
            <MyOutlinedInput
                value={expectedPrice.toLocaleString('ko-KR')}
                inputProps={{ style: { textAlign: "right" } }}
                size='small'
                startAdornment={<StartInputAdornment></StartInputAdornment>}
                // endAdornment={<InputAdornment position="end">원</InputAdornment>}
                endAdornment={<EndInputAdornment>원</EndInputAdornment>}
                onChange={(e)=>{
                const result = Number((e.target.value).replaceAll(',','')).toLocaleString('ko-KR');
                setExpectedPrice(result);
                }}
                onBlur={(e)=>{
                const result = (e.target.value).replaceAll(',','');
                const info = {...itemData.info, ['expected_price']:result};
                calculate();
                updateValue(e, info);
                }}
            />              
            }
        >
            <ListItemText primary={`예상 매매가`} />
        </ListItem>
        <ListItem
            key={9}
            disableGutters
            secondaryAction={
            <MyOutlinedInput
                value={expectedRentPrice.toLocaleString('ko-KR')}
                inputProps={{ style: { textAlign: "right" } }}
                size='small'
                // startAdornment={<StartInputAdornment>{(Number((expectedRentPrice).toString().replaceAll(',',''))/Number((expectedPrice).toString().replaceAll(',','')))*100}%</StartInputAdornment>}
                startAdornment={<StartInputAdornment>{calculated}%</StartInputAdornment>}
                endAdornment={<EndInputAdornment>원</EndInputAdornment>}
                onChange={(e)=>{
                const result = Number((e.target.value).replaceAll(',','')).toLocaleString('ko-KR');
                setExpectedRentPrice(result);
                }}
                onBlur={(e)=>{
                const result = (e.target.value).replaceAll(',','');
                const info = {...itemData.info, ['expected_rent_price']:result};
                calculate();
                updateValue(e, info);
                }}
            />              
            }
        >
            <ListItemText primary={`예상 전세가`} />
        </ListItem>
        <ListItem
            key={91}
            disableGutters
            secondaryAction={
            <MyOutlinedInput
                value={expectedRentPrice.toLocaleString('ko-KR')}
                inputProps={{ style: { textAlign: "right" } }}
                size='small'
                startAdornment={<StartInputAdornment></StartInputAdornment>}
                endAdornment={<EndInputAdornment>원</EndInputAdornment>}
                onBlur={(e)=>{
                  // const result = (e.target.value).replaceAll(',','');
                  // const info = {...itemData.info, ['expected_rent_price']:result};
                  // calculate();
                  // updateValue(e, info);
                }}
            />              
            }
        >
            <ListItemText primary={`예상 월세`} />
        </ListItem>
        <ListItem
            key={111}
            disableGutters
            secondaryAction={
              <>
                <Tooltip title={itemData.info['detail_address']} placement="top">
                <MyOutlinedInput
                    defaultValue={itemData.info['detail_address']}
                    inputProps={{ style: { textAlign: "left", cursor: "pointer" } }}
                    size='small'
                    startAdornment={<StartInputAdornmentForAddress>{itemData.info['address']}</StartInputAdornmentForAddress>}
                    onBlur={(e)=>{
                      const info = {...itemData.info, ['detail_address']:e.target.value};
                      updateValue(e, info);
                    }}
                    onDoubleClick={(e)=>{
                      setOpenModal(true);
                    }}
                    />              
                </Tooltip>
                <Modal
                  open={openModal}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <div id="testImg" sx={{ position: "relative", top: "700px", left: "350px" }}>
                    <img ref={ref} onLoad={onLoad} src={require("../images/seoul_map.jpg")} width={isMobile ? "400" : "1000"} height={isMobile ? "500" : "700"} alt="테스트이미지" onClick={(e)=>console.log(e.clientX, e.clientY)} />
                    {
                      loaded === true ? (
                        <>
                          <Button value='서울시 강서구' sx={{ position: "absolute", top: "305px", left: "150px" }} onClick={(e)=>test(e)}>강서구</Button>
                          <Button value='서울시 양천구' sx={{ position: "absolute", top: "410px", left: "200px" }} onClick={(e)=>test(e)}>양천구</Button>
                          <Button value='서울시 구로구' sx={{ position: "absolute", top: "460px", left: "200px" }} onClick={(e)=>test(e)}>구로구</Button>
                          <Button value='서울시 영등포구' sx={{ position: "absolute", top: "430px", left: "300px" }} onClick={(e)=>test(e)}>영등포구</Button>
                          <Button value='서울시 금천구' sx={{ position: "absolute", top: "550px", left: "270px" }} onClick={(e)=>test(e)}>금천구</Button>
                          <Button value='서울시 동작구' sx={{ position: "absolute", top: "460px", left: "400px" }} onClick={(e)=>test(e)}>동작구</Button>
                          <Button value='서울시 관악구' sx={{ position: "absolute", top: "550px", left: "380px" }} onClick={(e)=>test(e)}>관악구</Button>
                        </>
                      ) : (
                        <div stlye={{ width: "1000px", height: "10000px", backgroundColor: "red"}}>로딩중...</div>
                      ) 
                    }
                  </div>
                </Modal>
              </>
            }
        >
            <ListItemText primary={`주소`} />
        </ListItem>
        <ListItem
            key={10}
            disableGutters
            secondaryAction={
            <MyOutlinedInput
                defaultValue={itemData.info['year_of_construction']}
                inputProps={{ style: { textAlign: "right" } }}
                size='small'
                startAdornment={<StartInputAdornment>{itemData.info['year_of_construction'] === '' ? 0 : (nowYear-itemData.info['year_of_construction'])+1}년차</StartInputAdornment>}
                endAdornment={<EndInputAdornment>년</EndInputAdornment>}
                onBlur={(e)=>{
                const info = {...itemData.info, ['year_of_construction']:e.target.value};
                updateValue(e, info);
                }}
            />
            }
        >
            <ListItemText primary={`시공년도`} />
        </ListItem>
        <ListItem
            key={1}
            disableGutters
            secondaryAction={
            <MyOutlinedInput
                defaultValue={itemData.info['number_of_households']}
                inputProps={{ style: { textAlign: "right" } }}
                size='small'
                endAdornment={<EndInputAdornment>세대</EndInputAdornment>}
                onBlur={(e)=>{
                const info = {...itemData.info, ['number_of_households']:e.target.value};
                updateValue(e, info);
                }}
            />              
            }
        >
            <ListItemText primary={`세대수`} />
        </ListItem>
        <ListItem
            key={11}
            disableGutters
            secondaryAction={
            <MyOutlinedInput
                defaultValue={itemData.info['parking']}
                inputProps={{ style: { textAlign: "right" } }}
                size='small'
                startAdornment={<StartInputAdornmentForParking>세대당 {isFinite(itemData.info['parking']/itemData.info['number_of_households']) ? (Math.round((itemData.info['parking']/itemData.info['number_of_households'])*100)/100):0}대</StartInputAdornmentForParking>}
                endAdornment={<EndInputAdornment>대</EndInputAdornment>}
                onBlur={(e)=>{
                const info = {...itemData.info, ['parking']:e.target.value};
                updateValue(e, info);
                }}
            />              
            }
        >
            <ListItemText primary={`주차`} />
        </ListItem>
        <ListItem
            key={3}
            disableGutters
            secondaryAction={
            <MyOutlinedInput
                defaultValue={itemData.info['subway']}
                inputProps={{ style: { textAlign: "right" } }}
                size='small'
                placeholder='4호선 사당역 도보 5분'
                startAdornment={<StartInputAdornment>지하철</StartInputAdornment>}
                // endAdornment={
                // <Tooltip title='지하철 추가' placement="top">
                //     <AddCircleOutlineIcon style={{ cursor: "pointer" }} onClick={()=>window.open('https://land.naver.com/')}></AddCircleOutlineIcon>
                // </Tooltip>  
                // }
                onBlur={(e)=>{
                const info = {...itemData.info, ['subway']:e.target.value};
                updateValue(e, info);
                }}
            />      
            }
        >
            <ListItemText primary={`대중교통`} />
        </ListItem>
        <ListItem
            style={{ marginTop: '12px'}}
            key={4}
            disableGutters
            secondaryAction={
            <MyOutlinedInput
                defaultValue={itemData.info['bus']}
                inputProps={{ style: { textAlign: "right" } }}
                size='small'
                placeholder='도보 5분'
                startAdornment={<StartInputAdornment>버스</StartInputAdornment>}
            />            
            }
            onBlur={(e)=>{
            const info = {...itemData.info, ['bus']:e.target.value};
            updateValue(e, info);
            }}
        >
            <ListItemText primary={''} />
        </ListItem>
        <br></br>
        <ListItem
            key={6}
            disableGutters
            secondaryAction={
            <CheckBox 
              type="entrance_structure" 
              data={itemData.info['entrance_structure']} 
              itemData={itemData}
            />
            }
        >
            <ListItemText primary={`현관구조`} onClick={()=>console.log("rr")}/>
        </ListItem>
        <ListItem
            key={7}
            disableGutters
            secondaryAction={
            <CheckBox 
              type="heating" 
              data={itemData.info['heating']} 
              itemData={itemData}
            />        
            }
        >
            <ListItemText primary={`난방`} />
        </ListItem>
        <ListItem
            key={233}
            disableGutters
            secondaryAction={
            <CheckBox 
              type="underground_parking" 
              data={itemData.info['management_status']} 
              itemData={itemData}
            />          
            }
        >
            <ListItemText primary={`지하주차장`} />
        </ListItem>
        <ListItem
            key={2}
            disableGutters
            secondaryAction={
            <CheckBox 
              type="management_status" 
              data={itemData.info['management_status']} 
              itemData={itemData}
            />          
            }
        >
            <ListItemText primary={`관리상태`} />
        </ListItem>
        <ListItem
            key={5}
            disableGutters
            secondaryAction={
            <CheckBox 
              type="school" 
              data={itemData.info['school']}
              itemData={itemData}
            />
            }
        >
            <ListItemText primary={`학교`} />
        </ListItem>
        <ListItem
            key={81}
            disableGutters
            secondaryAction={
            <MyOutlinedInput
                defaultValue={itemData.info['naver_bds_url']}
                placeholder={naverLandUrl}
                inputProps={{ style: { textAlign: "left" } }}
                size='small'
                onBlur={(e)=>{
                let result;
                e.target.value === '' ? result = naverLandUrl : e.target.value.includes('land.naver.com') ? result = e.target.value : result = naverLandUrl;
                const info = {...itemData.info, ['naver_bds_url']:result};
                updateValue(e, info);
                }}
            />
            }
        >
            <ListItemText primary={`URL`} />
        </ListItem>
        <ListItem
            style={{ marginTop: "40px", marginBottom: "50px" }}
            key={82}
            disableGutters
            secondaryAction={
            <MyTextarea
                placeholder="메모를 입력하세요."
                defaultValue={itemData.info['memo']}
                minRows={2}
                maxRows={4}
                onBlur={(e)=>{
                const info = {...itemData.info, ['memo']:e.target.value};
                updateValue(e, info);
                }}
                />
            }
        >
            <ListItemText primary={`메모`} />
        </ListItem>
        <ImageUpload></ImageUpload>
        <br></br>
        <Link to='/' style={{ textDecoration: "none", color: "inherit" }}>
            <MyButton fullWidth={true} size="large" variant="outlined" >
            뒤로가기
            </MyButton>
        </Link>
    </MyList>
  );
}

export default DetailsList;