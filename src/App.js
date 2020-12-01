import './App.css';
import React from 'react';
import Login from "./login"
import Storeitems from "./storeitems"
import UserCart from "./UserCart/UserCart";

function App() {
  return (
      //props are like args in a function
    <div className="App">
        <Login/>
        <Storeitems/>
    </div>
  );
}

export default App;
