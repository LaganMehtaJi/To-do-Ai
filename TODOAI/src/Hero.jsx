import './App.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home'); // Navigate to Home after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [navigate]);

  return (
    <>
      <h1 className="blink-text" style={{fontSize:"100px", color:"black", paddingTop:"150px"}}>Ai Todo List</h1>
    </>
  );
}

export default Hero;
