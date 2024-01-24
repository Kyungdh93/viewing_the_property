import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Details from './pages/Details';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';

import { auth } from "./firebase-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";

import { login, getAllData } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { ref, child, get } from "firebase/database";
import { db } from "./firebase-config";
import { isBrowser, isMobile } from 'react-device-detect';

import { GlobalStyle } from "./theme/global";
import { darkTheme, lightTheme } from "./theme/theme";
import {ThemeProvider as StyledThemeProvider} from "styled-components";
import {CssBaseline, ThemeProvider as MuiThemeProvider} from "@material-ui/core";

function App() {
  const [theme, setTheme] = useState("dark");

  const user_data = useSelector((state) => state.user_data);
  const dispatch = useDispatch();

  function handleGoogleLogin() {
    if (isMobile) {
      dispatch(login('dahyun'));
      const dbRef = ref(db);
      get(child(dbRef, "/datas"))
        .then(snapshot => {
        if (snapshot.exists()) {
          dispatch(getAllData(snapshot.val()));
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch(error => {
        console.error(error);
      });
    } else {
      const provider = new GoogleAuthProvider(); // provider 구글 설정
      signInWithPopup(auth, provider) // 팝업창 띄워서 로그인
        .then((data) => {
          dispatch(login(data.user));
          console.log(data); // console에 UserCredentialImpl 출력
          const dbRef = ref(db);
            get(child(dbRef, "/datas"))
              .then(snapshot => {
              if (snapshot.exists()) {
                dispatch(getAllData(snapshot.val()));
                console.log(snapshot.val());
              } else {
                console.log("No data available");
              }
            })
              .catch(error => {
              console.error(error);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    };

  }

  return (
    <>
      { user_data ? (
        <MuiThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <StyledThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <GlobalStyle />
          <Navbar>
          </Navbar>
          <Routes>
            <Route exact path="/" element={<Home></Home>} />
            <Route path="/settings" element={<Settings></Settings>} />
            <Route path="/details/:item" element={<Details></Details>} />
          </Routes>
        </StyledThemeProvider>
        </MuiThemeProvider>
      ) : (
        <>
          <h3>구글 로그인 테스트</h3>
          <button onClick={handleGoogleLogin}>로그인</button>
          <h4>로그인하면 아래쪽에 이름이 나타납니다.</h4>
          <div>
            {user_data
              ? "당신의 이름은 : " + user_data.displayName
              : "로그인 버튼을 눌러주세요 :)"}
          </div>
        </>
      )}
    </>
  );
}

export default App;
