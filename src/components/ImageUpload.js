import * as React from 'react';
import { styled } from "styled-components";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { isMobile } from 'react-device-detect';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

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

const MyImageList = styled(ImageList)(
  ({ theme }) => ({
    width: isMobile === true ? '80vw' : 500, 
    height: 350,
    border: "1px dotted",
    borderColor: theme.colors.colorDarkGray,
  })
);

const sampleData = [
  // {
  //   img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
  //   title: 'Breakfast',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
  //   title: 'Burger',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
  //   title: 'Camera',
  // },
];

export default function ImageUpload() {
  const [itemData, setItemData] = React.useState(sampleData);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      setItemData([
        ...itemData, {img: reader.result, title: 'test'}
      ])

    };
  
    reader.readAsDataURL(file);
  }

  return (
    <>
      <MyImageList cols={2} rowHeight={164}>
        {
          itemData.length === 0 ? (
            <div style={{ margin: "auto" }} fullWidth={true}>
              <ImageNotSupportedIcon></ImageNotSupportedIcon>
            </div>
          ) : (
            itemData.map((item) => (
              <ImageListItem key={item.img} sx={{ overflow: "auto" }}>
                <img
                  // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  // src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  src={`${item.img}`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))
          )
        }
      </MyImageList>
      <MyButton fullWidth={true} size="large" component="label" startIcon={<CloudUploadIcon />}>
        사진 올리기
        <VisuallyHiddenInput type="file" onInput={handleUpload} />
      </MyButton>
      <br></br>
    </>
  );
}