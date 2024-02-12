import React, { useState, useEffect } from 'react';

import { useParams } from "react-router-dom";
import OutlinedInput from '@mui/material/OutlinedInput';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { todoUpdate } from '../store';
import Paper from '@mui/material/Paper';
import Textarea from '@mui/joy/Textarea';
import Modal from '@mui/material/Modal';
import { isMobile } from 'react-device-detect';
import { styled } from "styled-components";
import ImageUpload from "./ImageUpload";
import CheckBox from "./CheckBox";

const MyList = styled(List)(
  () => ({
    width: isMobile === true ? '100vw' : '100%', 
    maxWidth: isMobile === true ? 320 : 1000,
    // margin: "auto",
  })
);

const MyDiv = styled('div')(
  () => ({
    display: isMobile ? '' : 'flex', 
    width: isMobile ? "" : "1000px"
  })
);

const MyListItem = styled(ListItem)(
  () => ({
    padding: "10px",
  })
);

const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  color: theme.colors.colorMainFont,
  backgroundColor: theme.colors.colorMain,
  borderRadius: "20px",
  lineHeight: '60px',
  margin: "10px",
  width: isMobile ? "95vw" : "500px"
}));

const Item1 = styled(Item)(
  () => ({
    height: 655
  })
);

const Item2 = styled(Item)(
  () => ({
    height: 265,
  })
);

const Item3 = styled(Item)(
  () => ({
    height: 380,
  })
);

const MyOutlinedInput = styled(OutlinedInput)(
  ({ theme }) => ({
    fontSize: "14px",
    borderRadius: "10px",
    width: isMobile === true ? '63vw' : '300px', 
    color: theme.colors.colorMainFont,
    backgroundColor: theme.colors.colorMain,
    marginRight: "10px",
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
    // width: "65px",
    width: "150px",
    textAlign: "left",
  })
);

const StartInputAdornmentForMonthlyRent = styled(StartInputAdornment)(
  () => ({
    width: "150px",
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

const MyTextarea = styled(Textarea)(
  ({ theme }) => ({
    width: isMobile === true ? '63vw' : '300px', 
    height: "120px", 
    borderRadius: "10px", 
    backgroundColor: theme.colors.colorMain,
    color: theme.colors.colorMainFont,
    borderColor: theme.colors.colorDarkGray,
    marginRight: "10px",
    "&.Mui-focused" : {
      color: theme.colors.colorMainFont
    },
  })
);

const useImageLoaded = () => {
  const [loaded, setLoaded] = useState(false);
  const ref = React.useRef();
  const onLoad = () => {
    setLoaded(true);
  }

  useEffect(() => {
    if (ref.current && ref.current.complete) {
      onLoad()
    }
  })

  return [ref, loaded, onLoad]
}

const DetailsList = (props) => {
  const [ref, loaded, onLoad] = useImageLoaded()

  const dispatch = useDispatch();
  const { item } = useParams();

  const lists = useSelector((state) => state.datas);
  const itemData = lists[item];

  const [expectedPrice, setExpectedPrice] = useState(Number(itemData.info['expected_price']));
  const [expectedRentPrice, setExpectedRentPrice] = useState(Number(itemData.info['expected_rent_price']));
  const [expectedMonthlyRentPrice, setExpectedMonthlyRentPrice] = useState(Number(itemData.info['expected_monthly_rent_price']));
  const [calculated, setCalculated] = useState(0);
  const [openModal, setOpenModal] = useState(false);
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

  useEffect(() => {
    calculate();
  },[]);

  const updateValue = (e, info) => {
    dispatch(todoUpdate(itemData.id, info));
  };

  return (
    <MyList>
      <MyDiv style={{ display: isMobile ? '' : 'flex', width: isMobile ? "" : "1000px"}}>
        <Item1 key={0} elevation={5}>
        <MyListItem
        key={8}
        disableGutters
        secondaryAction={
            <MyOutlinedInput
                value={expectedPrice.toLocaleString('ko-KR')}
                inputProps={{ style: { textAlign: "right" } }}
                size='small'
                startAdornment={<StartInputAdornment></StartInputAdornment>}
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
        </MyListItem>
        <MyListItem
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
        </MyListItem>
        <MyListItem
            key={91}
            disableGutters
            secondaryAction={
            <MyOutlinedInput
                value={expectedRentPrice.toLocaleString('ko-KR')}
                inputProps={{ style: { textAlign: "right" } }}
                size='small'
                startAdornment={<StartInputAdornmentForMonthlyRent>100,000,000원</StartInputAdornmentForMonthlyRent>}
                endAdornment={<EndInputAdornment>원</EndInputAdornment>}
                onChange={(e)=>{
                  const result = Number((e.target.value).replaceAll(',','')).toLocaleString('ko-KR');
                  setExpectedRentPrice(result);
                }}
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
        </MyListItem>
        <MyListItem
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
                  <div sx={{ position: "relative", top: "700px", left: "350px" }}>
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
                        <div style={{ width: "1000px", height: "10000px", backgroundColor: "red"}}>로딩중...</div>
                      ) 
                    }
                  </div>
                </Modal>
              </>
            }
        >
            <ListItemText primary={`주소`} />
        </MyListItem>
        <MyListItem
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
        </MyListItem>
        <MyListItem
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
        </MyListItem>
        <MyListItem
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
        </MyListItem>
        <MyListItem
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
        </MyListItem>
        <MyListItem
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
        </MyListItem>
        <MyListItem
              style={{ marginTop: "10px" }}
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
          </MyListItem>
          <MyListItem
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
          </MyListItem>
        </Item1>
        <div>
          <Item2 key={1} elevation={5}>
          
          <MyListItem
            style={{ marginTop: '12px'}}
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
        </MyListItem>
        <MyListItem
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
        </MyListItem>
        <MyListItem
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
        </MyListItem>
        <MyListItem
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
        </MyListItem>
        <MyListItem
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
        </MyListItem>
          </Item2>
          <Item3 key={2} elevation={5}>
          <ImageUpload></ImageUpload>
          </Item3>
        </div>
      </MyDiv>
    </MyList>
  );
}

export default DetailsList;