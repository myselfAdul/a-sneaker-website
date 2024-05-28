import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import "./CartPage.scss";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";


const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {}
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {}
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {}
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/user-orders");
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="cart">
        <div>
          <div className="top">
            <h1>{`Hello ${auth?.token && auth?.user?.name}`}</h1>
            <h4>
              {cart?.length
                ? `You Have ${cart.length} item(s) in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h4>
            <hr />
          </div>
        </div>
        <div className="cart-box">
          <div className="orders">
            {cart?.map((p) => (
              <div className="item-box" key={p._id}>
                <div>
                  <img
                    src={`/api/v1/product/photo-product/${p._id}`}
                    className=""
                    alt={p.name}
                    width="200px"
                    height={"200px"}
                  />
                </div>
                <div className="item-desc">
                  <h4>{p.name}</h4>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price : $ {p.price}</p>

                  <MdOutlineRemoveShoppingCart 
                    className="cart-rmv"
                    size={'35'}
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </MdOutlineRemoveShoppingCart>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h3>Total : {totalPrice()} </h3>
            {auth?.user?.address ? (
              <>
                <div className="meta-data">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button onClick={() => navigate("/dashboard/user/profile")}>
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className=""
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="login-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="payment">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
