import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';

import { styled } from "styled-components";

import { Link } from 'react-router-dom';

import {  login } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   }),
// );

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// }));

const MyAppBar = styled(AppBar)(
  ({ theme }) => ({
    backgroundColor: theme.colors.colorBg,
    color: theme.colors.colorMainFont
  })
);

export default function SearchAppBar() {
  let navigate = useNavigate();
  const user_data = useSelector((state) => state.user_data);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const onLogOutClick = () => {
    signOut(auth);
    dispatch(login(null));
    navigate('/');
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MyAppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            // style={{ margin: "auto" }}
          >
            <Link to='/' style={{ textDecoration: "none", color: "inherit" }}>
              BDS
            </Link>
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </MyAppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div>
          <Avatar></Avatar>
          <Typography>Hello {user_data.displayName}! </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <Link to='/' style={{ textDecoration: "none", color: "black" }} onClick={handleDrawerClose}>
          <List>
              <ListItem key='Home' disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon></HomeIcon>
                  </ListItemIcon>
                  <ListItemText primary='Home'/>
                </ListItemButton>
              </ListItem>
          </List>
        </Link>
        {/* <Divider /> */}
        <Link to='/' style={{ textDecoration: "none", color: "black" }} onClick={handleDrawerClose}>
          <List>
              <ListItem key='Statics' disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <BarChartIcon></BarChartIcon>
                  </ListItemIcon>
                  <ListItemText primary='Statics'/>
                </ListItemButton>
              </ListItem>
          </List>
        </Link>
        {/* <Divider /> */}
        <Link to='/settings' style={{ textDecoration: "none", color: "black" }} onClick={handleDrawerClose}>
          <List>
              <ListItem key='Settings' disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SettingsIcon></SettingsIcon>
                  </ListItemIcon>
                  <ListItemText primary='Settings'/>
                </ListItemButton>
              </ListItem>
          </List>
        </Link>
        <Divider />
        <List onClick={onLogOutClick}>
          {['Logout'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <LogoutIcon /> : <LogoutIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}