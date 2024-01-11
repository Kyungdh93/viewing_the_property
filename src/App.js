import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Details from './pages/Details';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={Home} />
        <Route path="/settings" element={<Settings></Settings>} />
        <Route path="/details" element={<Details></Details>} />
      </Routes>
      <Navbar>
      </Navbar>
      {/* <Home></Home> */}
    </>
  );
}

export default App;
