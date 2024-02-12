import React, { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { styled } from "styled-components";

const MyPaper = styled(Paper)(
  () => ({
    position: 'fixed', 
    bottom: 0, 
    left: 0, 
    right: 0
  })
);

const MyBottomNavigation = styled(BottomNavigation)(
  ({ theme }) => ({
    backgroundColor: theme.colors.colorBg,
  })
);

const MyBottomNavigationAction = styled(BottomNavigationAction)(
  ({ theme }) => ({
    color: theme.colors.colorDarkGray,
    "&.Mui-selected" : {
      color: theme.colors.colorMainFont,
    }
  })
);

const BottomNavbar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(1);
  
  return (
    <MyPaper elevation={3}>
      <MyBottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          let target;
          target = newValue === 0 ? 'Statics' : newValue === 2 ? 'Settings' : '';
          setValue(newValue);
          navigate('/'+target);
        }}
      > 
        <MyBottomNavigationAction label="통계" icon={<EqualizerIcon />} />
        <MyBottomNavigationAction label="홈" icon={<HomeIcon />} />
        <MyBottomNavigationAction label="설정" icon={<SettingsIcon />} />
      </MyBottomNavigation>
    </MyPaper>
  );
};

export default BottomNavbar;
