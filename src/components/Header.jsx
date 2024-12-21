import React, { useState } from "react";
import ReactDOM from "react-dom";
import Login from "./Login";
import Register from "./Register";

function Header(props) {
  function handleLogin() {
    console.log("Login button clicked");
    ReactDOM.render(<Login />, document.getElementById("root"));
  }

  function handleRegister() {
    console.log("Register button clicked");
    ReactDOM.render(<Register />, document.getElementById("root"));
  }

  function handleChanges() {
    setIsLogedHeader(true);
  }

  return (
    <header>
      <h1>Keeper</h1>
      <p>Keep your notes in one place</p>
      {props.onLogin ? (
        <button onClick={handleChanges}>Logout</button>
      ) : (
        <div>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
        </div>
      )}
    </header>
  );
}

export default Header;
