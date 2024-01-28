import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import Divider from '@mui/material/Divider';

import { auth } from "../firebase-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { login } from '../store';
import { useDispatch } from 'react-redux';
import { isMobile } from 'react-device-detect';

const MyButton = styled(Button)(
  ({ theme }) => ({
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
  ({ theme }) => ({
    backgroundColor: "gray",
    height: 28, 
    margin: 0.5,
    marginRight: "10px" 
  })
);

const Auth = () => {
  const dispatch = useDispatch();
  
  function handleGoogleLogin() {
    if (isMobile) {
      dispatch(login('dahyun'));
    } else {
      const provider = new GoogleAuthProvider(); // provider 구글 설정
      signInWithPopup(auth, provider) // 팝업창 띄워서 로그인
        .then((data) => {
          dispatch(login(data.user));
          console.log(data); // console에 UserCredentialImpl 출력
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }

  return (
    <>
      <MyButton startIcon={<GoogleIcon></GoogleIcon>} onClick={handleGoogleLogin}> <MyDivider orientation="vertical" /> Sign in with Google</MyButton>
    </>
  );
}

export default Auth;