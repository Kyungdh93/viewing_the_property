import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Details from './pages/Details';
import Settings from './pages/Settings';
import Statics from './pages/Statics';
import Navbar from './components/Navbar';
import BottomNavbar from './components/BottomNavbar';
import { styled } from '@mui/material/styles';

import { useSelector } from 'react-redux';

import { GlobalStyle } from "./theme/global";
import { darkTheme, lightTheme } from "./theme/theme";
import { ThemeProvider as StyledThemeProvider} from "styled-components";
import { ThemeProvider as MuiThemeProvider} from "@material-ui/core";

import { StylesProvider } from "@material-ui/core/styles";
import Auth from "./components/Auth";
import { isMobile } from 'react-device-detect';

import Test from "./Test";
import CheckBox from "./components/CheckBox";

const MyDiv = styled('div')(
  ({ theme }) => ({
    marginTop: isMobile === true ? '20px' : '20px', 
    textAlign: "center"
  })
);

const App = () => {
  const theme = useSelector((state) => state.theme);
  const user_data = useSelector((state) => state.user_data);

  return (
    <>
      {/* <Test></Test> */}
      {/* { user_data ? ( */}
      { true ? (
        <StylesProvider injectFirst>
          <StyledThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
          <MuiThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
          <GlobalStyle />
            {
              isMobile ? (
                <><Navbar></Navbar></>
                ) : (
                <><Navbar></Navbar></>
              )
            }
            <MyDiv>
              <Routes>
                <Route exact path="/" element={<Home></Home>} />
                <Route path="/details/:item" element={<Details></Details>} />
                <Route path="/statics" element={<Statics></Statics>} />
                <Route path="/settings" element={<Settings></Settings>} />
              </Routes>
            </MyDiv>
            <CheckBox type="school" data="01"></CheckBox>
            <CheckBox type="housing_type" data="1"></CheckBox>
            <CheckBox type="heating" data="2"></CheckBox>
            <CheckBox type="entrance_structure" data="12"></CheckBox>
            <CheckBox type="management_status" data="02"></CheckBox>
            <CheckBox type="underground_parking" data="0"></CheckBox>

            {
              isMobile ? (
                <><BottomNavbar></BottomNavbar></>
              ) : (
                <></>
              )
            }
          </MuiThemeProvider>
          </StyledThemeProvider>
        </StylesProvider>
      ) : (
        <MyDiv>
          <Auth></Auth>
        </MyDiv>
      )}
    </>
  );
}

export default App;
