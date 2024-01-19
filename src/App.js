import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Details from './pages/Details';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';

import { auth } from "./firebase-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";

import { login } from './store';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  // const [userData, setUserData] = useState(null);
  const user_data = useSelector((state) => state.user_data);
  const dispatch = useDispatch();

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider(); // provider 구글 설정
    signInWithPopup(auth, provider) // 팝업창 띄워서 로그인
      .then((data) => {
        // setUserData(data.user); // user data 설정
        dispatch(login(data.user));
        console.log(data); // console에 UserCredentialImpl 출력
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      { user_data ? (
        <>
          <Navbar>
          </Navbar>
          <Routes>
            <Route exact path="/" element={<Home></Home>} />
            <Route path="/settings" element={<Settings></Settings>} />
            <Route path="/details/:item" element={<Details></Details>} />
          </Routes>
        </>
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
