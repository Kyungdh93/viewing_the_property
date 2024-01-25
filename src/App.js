import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Details from './pages/Details';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';
import Button from '@mui/material/Button';

import { auth } from "./firebase-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";

import { login, setAllData } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { ref, child, get } from "firebase/database";
import { db } from "./firebase-config";
import { isMobile } from 'react-device-detect';

import { GlobalStyle } from "./theme/global";
import { darkTheme, lightTheme } from "./theme/theme";
import {ThemeProvider as StyledThemeProvider} from "styled-components";
import { ThemeProvider as MuiThemeProvider} from "@material-ui/core";

import { StylesProvider } from "@material-ui/core/styles";

function App() {
  const [theme, setTheme] = useState("dark");

  const user_data = useSelector((state) => state.user_data);
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
      { user_data ? (
        <StylesProvider injectFirst>
          <StyledThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
          <MuiThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
          <GlobalStyle />
            <Navbar>
            </Navbar>
            <Routes>
              <Route exact path="/" element={<Home></Home>} />
              <Route path="/settings" element={<Settings></Settings>} />
              <Route path="/details/:item" element={<Details></Details>} />
            </Routes>
          </MuiThemeProvider>
          </StyledThemeProvider>
        </StylesProvider>
      ) : (
        <>
          <h3>구글 로그인 테스트</h3>
          <Button onClick={handleGoogleLogin}>로그인</Button>
        </>
      )}
    </>
  );
}

export default App;
