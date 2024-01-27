import * as React from 'react';

import { useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';

import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { todoUpdate } from '../store';
import Box from '@mui/material/Box';
import Textarea from '@mui/joy/Textarea';

import { isMobile } from 'react-device-detect';

import { styled } from "styled-components";
import ImageUpload from "./ImageUpload";

const MyList = styled(List)(
  () => ({
    width: isMobile === true ? '100vw' : '50%', 
    maxWidth: isMobile === true ? 320 : 1000,
    margin: "auto",
  })
);

const MyOutlinedInput = styled(OutlinedInput)(
  ({ theme }) => ({
    borderRadius: "20px",
    width: isMobile === true ? '60vw' : '300px', 
    color: theme.colors.colorMainFont,
    "& .MuiOutlinedInput-notchedOutline" : {
      borderColor : theme.colors.colorDarkGray
    },
    "&:hover > .MuiOutlinedInput-notchedOutline" : {
      borderColor : theme.colors.colorMainFont,
      color: "white"
    },
    "&.Mui-focused > .MuiOutlinedInput-notchedOutline" : {
      borderColor : theme.colors.colorMainFont,
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

const MyCheckbox = styled(Checkbox)(
  ({ theme }) => ({
    color: theme.colors.colorDarkGray,
    '&.Mui-checked': {
        color: theme.colors.colorMainFont,
        backgroundColor: theme.colors.colorDarkShadow
    }
  })
);

const MyRadio = styled(Radio)(
  ({ theme }) => ({
    color: theme.colors.colorDarkGray,
    '&.Mui-checked': {
        color: theme.colors.colorMainFont,
        backgroundColor: theme.colors.colorDarkShadow
    }
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
    width: isMobile === true ? '60vw' : '300px', 
    height: "120px", 
    borderRadius: "20px", 
    backgroundColor: theme.colors.colorBg,
    color: theme.colors.colorMainFont,
    borderColor: theme.colors.colorDarkGray,
    // "&.Mui-focused" : {
    //   borderColor : theme.colors.colorMainFont,
    //   color: "white"
    // },
  })
);

function DetailsList(props) {
  const dispatch = useDispatch();
  const { item } = useParams();

  const lists = useSelector((state) => state.datas);
  const itemData = lists[item];
//   console.log('itemData = ', itemData);

  const [expectedPrice, setExpectedPrice] = React.useState(Number(itemData.info['expected_price']));
  const [expectedRentPrice, setExpectedRentPrice] = React.useState(Number(itemData.info['expected_rent_price']));
  const [calculated, setCalculated] = React.useState(0);
  const mappingData = props.mappingData;
  const orderArray = props.orderArray;
  const nowYear = props.nowYear;
  const naverLandUrl = props.naverLandUrl;

  const calculate = () => {
    let result = (Number((expectedRentPrice).toString().replaceAll(',',''))/Number((expectedPrice).toString().replaceAll(',','')))*100;
    result = result === NaN ? 0 : isFinite(result) ? Math.round(result) : 0;
    setCalculated(result);
  };

  React.useEffect(() => {
    calculate();
  },[]);

  const updateValue = (e, info) => {
    dispatch(todoUpdate(itemData.id, info));
  };

  return (
    <MyList>
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
            {/* <ListItemText primary={`예상 매매가`} primaryTypographyProps={{fontSize: '13px'}} /> */}
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
            key={110}
            disableGutters
            secondaryAction={
                <Tooltip title={itemData.info['address']} placement="top">
                <MyOutlinedInput
                    defaultValue={itemData.info['address']}
                    size='small'
                    onBlur={(e)=>{
                    const info = {...itemData.info, ['address']:e.target.value};
                    updateValue(e, info);
                    }}
                />              
                </Tooltip>
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
            key={5}
            disableGutters
            secondaryAction={
            <FormGroup aria-label="position" row 
                onClick={(e)=>{
                let result;
                e.target.checked === true ? result = itemData.info['school'] + e.target.value : result = itemData.info['school'].replaceAll(e.target.value, '');
                const info = {...itemData.info, ['school']:result};
                updateValue(e, info);
                }
            }>
                <FormControlLabel
                value="0"
                control={<MyCheckbox defaultChecked={itemData.info['school'].includes('0') ? true : false}/>}
                label="초등"
                labelPlacement="bottom"
                />
                <FormControlLabel
                value="1"
                control={<MyCheckbox defaultChecked={itemData.info['school'].includes('1') ? true : false}/>}
                label="중"
                labelPlacement="bottom"
                />
                <FormControlLabel
                value="2"
                control={<MyCheckbox defaultChecked={itemData.info['school'].includes('2') ? true : false}/>}
                label="고등"
                labelPlacement="bottom"
                />
            </FormGroup>
            }
        >
            {/* <ListItemIcon style={{ cursor: 'pointer' }} onClick={()=>console.log('CLICK!!')}>
            <CommentIcon />
            </ListItemIcon> */}
            <ListItemText primary={`학교`} />
        </ListItem>
        <br></br>
        <ListItem
            key={6}
            disableGutters
            secondaryAction={
            <FormGroup aria-label="position" row 
                onClick={(e)=>{
                let result;
                e.target.checked === true ? result = itemData.info['entrance_structure'] + e.target.value : result = itemData.info['entrance_structure'].replaceAll(e.target.value, '');
                const info = {...itemData.info, ['entrance_structure']:result};
                updateValue(e, info);
                }
            }>
                <FormControlLabel
                value="0"
                control={<MyCheckbox defaultChecked={itemData.info['entrance_structure'].includes('0') ? true : false}/>}
                label="계단"
                labelPlacement="bottom"
                />
                <FormControlLabel
                value="1"
                control={<MyCheckbox defaultChecked={itemData.info['entrance_structure'].includes('1') ? true : false}/>}
                label="복도"
                labelPlacement="bottom"
                />
                <FormControlLabel
                value="2"
                control={<MyCheckbox defaultChecked={itemData.info['entrance_structure'].includes('2') ? true : false}/>}
                label="복합"
                labelPlacement="bottom"
                />
                {/* <CheckBoxInput type="checkbox" id={"qq"} name="skills" />
                <CheckboxLabel htmlFor={"qq"}>
                    {"11"}
                </CheckboxLabel> */}
            </FormGroup>
            }
        >
            <ListItemText primary={`현관구조`} onClick={()=>console.log("rr")}/>
        </ListItem>
        <br></br>
        <ListItem
            key={7}
            disableGutters
            secondaryAction={
            <RadioGroup
                row
                aria-labelledby="demo-form-control-label-placement"
                name="position"
                defaultValue={itemData.info['heating']}
                onClick={(e)=>{
                const info = {...itemData.info, ['heating']:e.target.value};
                updateValue(e, info);
                }}
            >
                <FormControlLabel
                value="0"
                control={<MyRadio/>}
                label="지역"
                labelPlacement="bottom"
                />
                <FormControlLabel
                value="1"
                control={<MyRadio size="medium"/>}
                label="개별"
                labelPlacement="bottom"
                />
                <FormControlLabel
                value="2"
                control={<MyRadio size="medium"/>}
                label="중앙"
                labelPlacement="bottom"
                />
            </RadioGroup>           
            }
        >
            <ListItemText primary={`난방`} />
        </ListItem>
        <br></br>
        <ListItem
            key={2}
            disableGutters
            secondaryAction={
            <RadioGroup
                row
                aria-labelledby="demo-form-control-label-placement"
                name="position"
                defaultValue={itemData.info['management_status']}
                onClick={(e)=>{
                const info = {...itemData.info, ['management_status']:e.target.value};
                updateValue(e, info);
                }}
            >
                <FormControlLabel
                value="0"
                control={<MyRadio/>}
                label="나쁨"
                labelPlacement="bottom"
                />
                <FormControlLabel
                value="1"
                control={<MyRadio size="medium"/>}
                label="보통"
                labelPlacement="bottom"
                />
                <FormControlLabel
                value="2"
                control={<MyRadio size="medium"/>}
                label="좋음"
                labelPlacement="bottom"
                />
            </RadioGroup>           
            }
        >
            <ListItemText primary={`관리상태`} />
        </ListItem>
        <br></br>
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
            style={{ marginTop: "50px" }}
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
        <br></br>
        <br></br>
        <br></br>
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