import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [err, setErr] = useState(null);
  const handleChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(inputs));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      validated();
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.name) {
      errors.name = "Name is required!";
    }
    return errors;
  };
  const navigate = useNavigate();

  const validated = async () => {
    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setErr(err.response.data);
    }
  };
  console.log(err);
  // console.log(inputs);
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Crowd Hub.</h1>
          <p>
            CrowdHub is a social media web app that lets you share posts,
            comment, like and more. It's not just another social media website
            it's an actual community where you can connect with people.
            <br /> Start a CrowdHub account to share your thoughts and feedback.
            Come lets join our community...!
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <span>{formErrors.username}</span>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <span>{formErrors.email}</span>

            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <span>{formErrors.password}</span>

            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            <span>{formErrors.name}</span>

            {err && <span>{err}</span>}
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
