import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { styled } from "styled-components";
import { isMobile } from 'react-device-detect';

import { setMaxCount } from '../store';
import { useDispatch, useSelector } from 'react-redux';

const MySelect = styled(Select)(
  ({ theme }) => ({
    backgroundColor: theme.colors.colorMain,
    color: theme.colors.colorMainFont,
    borderColor: theme.colors.colorDarkGray, 
    marginBottom: "5px",
    width: isMobile === true ? '20vw' : '10vw', 
    height: isMobile === true ? '7vh' : '50px', 
  })
);

function Settings() {
  const dispatch = useDispatch();
  const max_count = useSelector((state) => state.maxCount);
  const countList = [3, 5, 7, 10, 20];
  const handleChange = (e) => {
    dispatch(setMaxCount(e.target.value));
  }

  return (
      <>
        <MySelect
          value={max_count}
          onChange={handleChange}
        >
          {
            countList.map((count)=>{
              return <MenuItem key={count} value={count}>{count}</MenuItem>
            })
          }
        </MySelect>
      </>
    );
  }
  
  export default Settings;
  