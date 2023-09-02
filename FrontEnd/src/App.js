import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/homePage';
import Login from './components/loginPage';
import Signup from "./components/signupPage"
import Profile from './components/profilePage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="/profile" Component={Profile} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
