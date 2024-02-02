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
      { user_data ? (
        <StylesProvider injectFirst>
          <StyledThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
          <MuiThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
          <GlobalStyle />
            {
              isMobile ? (
                <></>
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
