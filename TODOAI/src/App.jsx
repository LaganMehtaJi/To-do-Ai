import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Hero from './Hero.jsx';
import Home from './Home.jsx';
function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero/>}/>
          <Route path="/home" element={<Home/>} />
        </Routes>
      </BrowserRouter>
      
    </>
  );
  
}

export default App;
