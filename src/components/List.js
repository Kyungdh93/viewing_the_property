import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const lists = [
  {title : "테스트1", sub_title : 1, id : 0}, 
  {title : "테스트2", sub_title : 2, id : 1},
  {title : "테스트3", sub_title : 3, id : 2},
  {title : "테스트4", sub_title : 4, id : 3}
]
// const lists = []

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteItem = () => {
    console.log("Delete!");
  }

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Button fullWidth="true" size="large" style={{ borderRadius: "20px" }} variant="outlined" startIcon={<AddIcon />} onClick={handleOpen}>
        추가하기
      </Button>
      <Demo>
        { lists.length !== 0 ? (
          lists.map((it)=>(
            <Link to={`/details/${it.title}`} key={`${it.id}`}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={deleteItem}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemButton>
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={it.title}
                  secondary={it.sub_title}
                />
                </ListItemButton>
              </ListItem>,
            </Link>
          ))
        ) : (
          <h2>텅</h2>
        )}
        {/* {generate(
          <Link to={`/details/${2}`}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={deleteItem}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemButton>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Single-line item"
                secondary='Secondary text'
              />
              </ListItemButton>
            </ListItem>,
          </Link>
        )} */}
      </Demo>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            제목!
          </Typography>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <FormLabel id="demo-form-control-label-placement">세대수</FormLabel>
            <OutlinedInput
              id="outlined-adornment-weight"
              endAdornment={<InputAdornment position="end">세대</InputAdornment>}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
              placeholder="ex) 500"
            />
          </FormControl>
        </Box>
      </Modal>
    </Box>
  );
}