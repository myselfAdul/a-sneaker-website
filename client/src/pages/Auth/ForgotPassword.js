import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "../../styles/AuthStyles.css";
import "./ForgotPassword.scss";

const ForgotPasssword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
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
      <div className="forgot-pass">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h4 className="title">Reset Password</h4>
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
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter Your favorite Sport Name"
                required
              />
            </div>

            <div className="input-field">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Your New Password"
                required
              />
            </div>

            <button type="submit" className="reset-btn">
              RESET
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPasssword;
