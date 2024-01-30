import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

import { styled } from "styled-components";

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
  const [value, setValue] = React.useState(1);
  
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
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
        <MyBottomNavigationAction label="Statics" icon={<EqualizerIcon />} />
        <MyBottomNavigationAction label="Home" icon={<HomeIcon />} />
        <MyBottomNavigationAction label="Settings" icon={<SettingsIcon />} />
      </MyBottomNavigation>
    </Paper>
  );
};

export default BottomNavbar;
