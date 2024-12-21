import axios from "axios";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Header from "./Header";

function Login() {
  const [isLoged, setIsLoged] = useState(false);

  const [fullname, setFullname] = useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFullname({ ...fullname, [name]: value });
  }

  async function handleClick(event) {
    event.preventDefault();
    console.log("Login button clicked");
    // Add logic to handle login functionality here

    try {
      const result = await axios.post(
        "http://localhost:3000/api/login",
        fullname
      );

      if (result.data.success) {
        console.log("Login successful");
        setIsLoged(true);
        ReactDOM.render(
          <App onLogin={isLoged} />,
          document.getElementById("root")
        );
      } else {
        console.log(result.data.message);
        alert(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Header />
      <h2>Login</h2>
      <form>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <button
          type="submit"
          onClick={handleClick}
          style={isLoged ? { backgroundColor: "black" } : null}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
