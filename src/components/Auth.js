import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import Divider from '@mui/material/Divider';
import { auth } from "../firebase-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { login } from '../store';
import { useDispatch } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';

const MyButton = styled(Button)(
  () => ({
    borderRadius: "20px", 
    width: isMobile === true ? '100vw' : '500px', 
    height: "50px", 
    color: "gray", 
    backgroundColor: "white",
    border: "1px groove",
    borderColor: "black",
    textTransform: 'none',
    fontSize: "20px",
  })
);

const MyDivider = styled(Divider)(
  () => ({
    backgroundColor: "gray",
    height: 28, 
    margin: 0.5,
    marginRight: "10px" 
  })
);

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider(); // provider 구글 설정
      signInWithPopup(auth, provider) // 팝업창 띄워서 로그인
        .then((data) => {
          dispatch(login(data.user));
          console.log(data); // console에 UserCredentialImpl 출력
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const handleLocalLogin = () => {
    dispatch(login('local'));
    navigate('/');
  }

  return (
    <div style={{ backgroundColor: "black", height: "110vh" }}>
      <Grid container spacing={2}>
        <Grid item xs>
          <img src={require("../images/building.jpg")} />
        </Grid>
        <Grid item xs>
          <div style={{ color: 'white', fontSize: '50px' }}>원터치 임장</div>
          <div>
            <MyButton startIcon={<GoogleIcon/>} onClick={handleGoogleLogin}> <MyDivider orientation="vertical" /> 구글 계정 로그인</MyButton>
          </div>
          <div>
            <MyButton startIcon={<AccessibilityIcon/>} onClick={handleLocalLogin}> <MyDivider orientation="vertical" /> 비회원 로그인</MyButton>
          </div>
        </Grid>
      </Grid>
      
    </div>
  );
}

export default Auth;