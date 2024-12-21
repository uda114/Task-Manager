import React from "react";

function Register() {
  function handleClick(event) {
    event.preventDefault();
    console.log("Register button clicked");
  }
  return (
    <div>
      <h2>Register</h2>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit" onClick={handleClick}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
