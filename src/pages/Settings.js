import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from "styled-components";
import { isMobile } from 'react-device-detect';

import { setMaxCount } from '../store';
import { useDispatch, useSelector } from 'react-redux';

import MaxCount from '../components/SettingsMaxCount';
import Switch from '../components/Switch';

const MyList = styled(List)(
  () => ({
    width: isMobile === true ? '100vw' : '50%', 
    maxWidth: isMobile === true ? 320 : 1000,
    margin: "auto",
  })
);

function Settings() {
  const max_count = useSelector((state) => state.maxCount);

  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    dispatch(setMaxCount(e.target.value));
  }

  return (
    <Box sx={{ flexGrow: 1, margin: "auto", maxWidth: 1000, marginTop: "70px" }}>
      <Grid container spacing={3}>
       <Grid item xs></Grid>
        <Grid item xs={10}>
          <MyList>
            <ListItem
            key={0}
            disableGutters
            secondaryAction={
              <MaxCount></MaxCount>           
            }
            >
              <ListItemText primary={`최대값`} />
            </ListItem>
            <ListItem
            key={1}
            disableGutters
            secondaryAction={
              <Switch></Switch>
            }
            >
              <ListItemText primary={`테마`} />
            </ListItem>
          </MyList>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </Box>
    );
  }
  
  export default Settings;
  