import React from "react";
import { NavLink } from "react-router-dom";

import "./UserMenu.scss";

const UserMenu = () => {
  return (
    <>
      <div className="admin-panel">
        <div className="crud-list">
          {/* <h4>User Panel</h4> */}
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/user-orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
