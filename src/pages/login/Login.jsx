import React, { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const { login } = useContext(AuthContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(inputs);
      navigate("/");
      //NAVIGATE TO HOMEPAGE IF LOGIN WITHOUT ERROR
    } catch (err) {
      setErr(err.response.data);
    }
  };
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Crowd Hub.</h1>
          <p>
            Welcome, CrowdHub gives you a single login and enhanced experience
            connecting you to the people and companies in your network who
            matter most. Come lets get into the crowd.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
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
            {err && <span>{err}</span>}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
