import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useDispatch } from "react-redux";
import { logIn, signUp } from "../../actions/AuthAction";

const Auth = () => {
  const [isSignUp, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  });

  const [confirmPass, setConfirmPass] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      if (data.password === data.confirmpass) {
        setConfirmPass(true);
        dispatch(signUp(data));
      } else {
        setConfirmPass(false);
      }
    } else {
      dispatch(logIn(data));
    }
  };

  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpass: "",
    });
  };

  return (
    <div className="Auth">
      {/* Left Side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>ZKC Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>
      {/* Right SIde */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign up" : "Log In"}</h3>

          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="Usernames"
              value={data.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                value={data.confirmpass}
                onChange={handleChange}
              />
            )}
          </div>
          {isSignUp && (
            <span
              style={{
                display: confirmPass ? "none" : "block",
                color: "red",
                fontSize: 12,
                alignSelf: "flex-end",
                marginRight: "5px",
              }}
            >
              * Confirm pass does not match!
            </span>
          )}

          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {
                setIsSignup((prev) => !prev);
                resetForm();
              }}
            >
              {isSignUp
                ? "Already have an account. Login!"
                : "Don't have an account? Sign Up"}
            </span>
          </div>
          <button className="button infoButton" type="submit">
            {isSignUp ? "Signup" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
