import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import { CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function MultiActionAreaCard({ item, handleOpenDialog }) {
  const navigate = useNavigate();
  const selectItem = () => {
    navigate('/details/'+item.id);
  }

  return (
    <Card style={{ width: "33%" }} sx={{ maxWidth: 500 }}>
      <CardActionArea onClick={selectItem}>
        <CardMedia
          component="img"
          height="140"
          image={require("../home.jpg")}
          alt="home"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.time}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ display: "grid" }}>
        <IconButton edge="end" aria-label="delete" onClick={()=>handleOpenDialog(item.id)}>
          <DeleteIcon color="primary"/>
        </IconButton>
      </CardActions>
    </Card>
  );
}