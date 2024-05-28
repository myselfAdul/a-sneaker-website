import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="admin-dashboard">
        <h4>{auth?.user?.name}'s dashboard</h4>
        <div className="dash-card">
          <div className="menu">
            <UserMenu />
          </div>
          <div className="right">
            <div className="admin-desc">
              <h1>User Name : {auth?.user?.name}</h1>
              <h2>User Email : {auth?.user?.email}</h2>
              <h2>User Address : {auth?.user?.address}</h2>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
