import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './Profile';
import Addition from './Addition';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Logo from "./logo.svg"

function App() { 

  return (
    <BrowserRouter>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container" style={{ justifyContent: 'flex-start' }}>
          <div>
            <a className="navbar-brand" style={{color: "blue"}} href="/">
              <img style={{ height: '60px', width: '60px' }} src={Logo} />
              Addition App
            </a>
          </div>&nbsp;&nbsp;
          <div>
            <a className="navbar-brand nav-link link" href="/">
              Profile
            </a>
          </div>
          <div>
            <a className="navbar-brand nav-link link" href="/addition">
              Addition
            </a>
          </div>
        </div>
      </nav>
      <main className="flex-shrink-0">
        <div className="container" style={{maxWidth: '1000px'}}>
          <Routes>
            <Route exact path="/" element={<Profile />} />
            <Route path="/addition" element={<Addition />} />
          </Routes>
        </div>
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;