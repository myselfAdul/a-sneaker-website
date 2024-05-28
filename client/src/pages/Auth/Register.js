import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";

import "./Register.scss";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        navigate("/login");
      } else {
      }
    } catch (error) {}
  };

  return (
    <Layout>
      <div className="register">
        <div className="main">
          <form onSubmit={handleSubmit} className="register-form">
            <h4 className="form-title">REGISTER</h4>
            <hr />

            <div className="form-input">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                id="nameInput"
                placeholder="Name"
                required
                autoFocus
              />
            </div>
            <div className="form-input">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="emailInput"
                placeholder="Email"
                required
              />
            </div>
            <div className="form-input">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="passwordInput"
                placeholder="Password"
                required
              />
            </div>
            <div className="form-input">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                id="phoneInput"
                placeholder="Phone no."
                required
              />
            </div>
            <div className="form-input">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
                id="addressInput"
                placeholder="Address"
                required
              />
            </div>
            <div className="form-input">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                id="answerInput"
                placeholder="What is your favourite sport?"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
