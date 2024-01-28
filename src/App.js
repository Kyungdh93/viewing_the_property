import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Details from './pages/Details';
import Settings from './pages/Settings';
import Statics from './pages/Statics';
import Navbar from './components/Navbar';
import { styled } from '@mui/material/styles';

import { useSelector } from 'react-redux';

import { GlobalStyle } from "./theme/global";
import { darkTheme, lightTheme } from "./theme/theme";
import { ThemeProvider as StyledThemeProvider} from "styled-components";
import { ThemeProvider as MuiThemeProvider} from "@material-ui/core";

import { StylesProvider } from "@material-ui/core/styles";
import Auth from "./components/Auth";
import { isMobile } from 'react-device-detect';

const MyDiv = styled('div')(
  ({ theme }) => ({
    marginTop: isMobile === true ? '300px' : '20px', 
    textAlign: "center"
  })
);

function App() {
  const theme = useSelector((state) => state.theme);
  const user_data = useSelector((state) => state.user_data);

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
              <Route path="/details/:item" element={<Details></Details>} />
              <Route path="/statics" element={<Statics></Statics>} />
              <Route path="/settings" element={<Settings></Settings>} />
            </Routes>
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
