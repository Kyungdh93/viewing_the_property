import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Details from './pages/Details';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar>
      </Navbar>
      <Routes>
        <Route exact path="/" element={<Home></Home>} />
        <Route path="/settings" element={<Settings></Settings>} />
        <Route path="/details" element={<Details></Details>} />
      </Routes>
      {/* <Home></Home> */}
    </>
  );
}

export default App;
