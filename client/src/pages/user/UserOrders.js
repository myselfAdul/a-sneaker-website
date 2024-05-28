import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import moment from "moment";

import "./UserOrder.scss";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/user-orders");
      setOrders(data);
    } catch (error) {
    }
  };

  useEffect(() => {
    getOrders();
  }, []);
  

  return (
    <Layout>
      <div className="orders-container">
        <div className="main">
          
          <UserMenu />
          
          <div >
            <h1 className="text-center">All Orders</h1>
            {orders.map((order, index) => (
              <div className="order-card" key={order._id}>
                <table className="order-table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{order.status}</td>
                      <td>{order.buyer.name}</td>
                      <td>{moment(order.createdAt).fromNow()}</td>
                      <td>{order.payment.success ? "Success" : "Failed"}</td>
                      <td>{order.products.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="product-list">
                  {order.products.map((product) => (
                    <div className="product-card" key={product._id}>
                      <div className="product-image">
                        <img
                          src={`/api/v1/product/photo-product/${product._id}`}
                          alt={product.name} height='100px'
                        />
                      </div>
                      <div className="product-details">
                        <p>{product.name}</p>
                        {/* <p>{product.description.substring(0, 30)}</p> */}
                        <p>Price: {product.price}</p>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserOrders;
