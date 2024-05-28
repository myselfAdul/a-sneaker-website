import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";

import { useAuth } from "../../context/auth";

import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
      }
    } catch (error) {}
  };

  return (
    <Layout>
      <div className="login">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h4 className="title">LogIN</h4>

            <hr />

            <div className="input-field">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter Your Email"
                required
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Your Password"
                required
              />
            </div>

            <button type="submit" className="btn-login">
              LOGIN
            </button>
            <p
              type="button"
              className="forgot"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </p>

            <div className="reg">
              <p>Don't have an account?</p>
              <Link to={"/register"} className="regi">
                <span>Click here to Register</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
