import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;


const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not processed", "Processing", "Shipped", "Delivered", "Canceled"
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
        console.log(error)
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
    }
  }; 

  
  return (
    <Layout>
      <div className="orders-container">
        <div className="main">
          <AdminMenu />
          <div>
            <h1 className="text-center">All Orders </h1>
            {orders?.map((o, i) => {
              return (
                <div className="order-card">
                  <table className="order-table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col"> date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <Select
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="product-list">
                    {o?.products?.map((p, i) => (
                      <div className="product-card" key={p._id}>
                        <div className="product-image">
                          <img
                            src={`/api/v1/product/photo-product/${p._id}`}
                            className=""
                            alt={p.name}
                            width=""
                            height={"10px"}
                          />
                        </div>
                        <div className="product-details">
                          <p>{p.name}</p>
                          {/* <p>{p.description.substring(0, 30)}</p> */}
                          <p>Price : $ {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
  
};

export default AdminOrders;
