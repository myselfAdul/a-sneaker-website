import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminPanel.scss";

const AdminMenu = () => {
  return (
    <>
      <div className="admin-panel">
        <div className="crud-list">
          {/* <h4>Admin Panel <hr /></h4> */}

          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create product
          </NavLink>
          <NavLink
            to="/dashboard/admin/show-products"
            className="list-group-item list-group-item-action"
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            All Orders
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-bidding"
            className="list-group-item list-group-item-action"
          >
            Bidding
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
