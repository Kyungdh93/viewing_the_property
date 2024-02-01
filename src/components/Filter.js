import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { isMobile } from 'react-device-detect';

import Select from './Select';
import { styled } from "styled-components";

const MyList = styled(List)(
  () => ({
    height: "100px",
    width: isMobile === true ? '75vw' : '50%', 
    maxWidth: isMobile === true ? 320 : 1000,
    marginTop: "10px"
  })
);

const Filter = () => {
  return (
    <MyList>
      <ListItem
      key={0}
      disableGutters
      secondaryAction={
          <Select></Select>
        }
      >
          <ListItemText primary={`지역`} />
      </ListItem>
    </MyList>
  );
};

export default Filter;