import React, { useState } from 'react';
import './App.css';
// import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Profile from "./src/img/1.png"
import Logo from "./logo.svg"

function App() {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [frontEndResult, setFrontEndResult] = useState(null);
  const [backEndResult, setBackEndResult] = useState(null);

  const handleAdd = async () => {
    handleAddFrontEnd(); // Perform front end calculation

    try {
      const response = await fetch('http://localhost:5000/api/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number1: Number(number1), number2: Number(number2) }),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error('Backend calculation failed');
      }

      const data = await response.json();
      setBackEndResult(data.result);
    } catch (error) {
      console.error('Error fetching data from backend:', error);
    }
  };

  const handleAddFrontEnd = () => {
    const result = Number(number1) + Number(number2);
    setFrontEndResult(result);
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <div>
            <a className="navbar-brand" href="/">
            <img style={{height:'60px',width:'60px'}} src={ Logo }/>
              Addition App
            </a>     
          </div>
               
        </div>
      </nav>
      <main className="container mt-4 row justify-content-center">
        <div style={{width: '50%'}} >
          <div className="row mb-3">
            <div className="col-md-3">
              <img style={{height:'300px',width:'300px'}} src={ Logo }/>
            </div>
            <div className="col-md-9">
              <h3>Leao Thring</h3>
              "Here is my Profile "
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">
                Enter First Number:
              </label>
            </div>
            <div className="col-md-6">
              <input type="number" className="form-control" value={number1} onChange={(e) => setNumber1(e.target.value)} />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">
                Enter Second Number:
              </label>
            </div>
            <div className="col-md-6">
              <input type="number" className="form-control" value={number2} onChange={(e) => setNumber2(e.target.value)} />
            </div>
          </div>
          <div className="mb-3">
            <button className="btn btn-primary" onClick={handleAdd}>
              Add
            </button>
          </div>

          {frontEndResult !== null && <p className="result mt-3">Front End Result: {frontEndResult}</p>}
          {backEndResult !== null && <p className="result mt-3">Back End Result: {backEndResult}</p>}
        </div>
        
        
      </main>
    </div>
  );
}

export default App;