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
import Chart from '../components/Chart';

const MyList = styled(List)(
  () => ({
    width: isMobile === true ? '100vw' : '50%', 
    maxWidth: isMobile === true ? 320 : 1000,
    margin: "auto",
  })
);

function Statics() {
  const lists = useSelector((state) => state.datas);
  console.log(lists);

  const dispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 1, margin: "auto", maxWidth: 1000 }}>
      <Grid container spacing={3}>
       <Grid item xs></Grid>
        <Grid item xs={10}>
          <Chart></Chart> 
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </Box>
    );
  }
  
  export default Statics;
  