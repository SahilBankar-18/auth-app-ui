
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login'
import Signup from './pages/SignUp';
import Home from './pages/Home';
import { useState } from 'react';
import RefreshHandler from './pages/RefreshHandler';




function App() {

  const [isAuthenticated, setIsAuthenticated]= useState(false);

  const PrivateRoute = ({element})=>{
    return isAuthenticated ? element : <Navigate to="/login"/>
  }

  return (
    <>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
      <Route path='/' element={<Navigate to="/Login" />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/home' element={<PrivateRoute element={<Home />}/>}/>
      </Routes>
    </>
  );
}

export default App;
