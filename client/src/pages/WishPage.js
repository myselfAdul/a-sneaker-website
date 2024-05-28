import React from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";

import { useWish } from "../context/wishList.js";
import { useAuth } from "../context/auth";

import { MdOutlineRemoveCircle } from "react-icons/md";

import "./WishPage.scss";

const WishlistPage = () => {
  const [auth] = useAuth();
  const [wish, setWish] = useWish();

  const navigate = useNavigate();

  const removeWishItem = (pid) => {
    try {
      let myWish = [...wish];
      let index = myWish.findIndex((item) => item._id === pid);
      myWish.splice(index, 1);
      setWish(myWish);
      localStorage.setItem("wish", JSON.stringify(myWish));
    } catch (error) {}
  };

  return (
    <Layout>
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1 className="wishlist-title">
            {`Hello ${auth?.token && auth?.user?.name}`}
          </h1>
          <h4 className="wishlist-subtitle">
            {wish?.length
              ? `You Have ${wish.length} Item(s) in Your Wishlist ${
                  auth?.token ? "" : "Please Login to Checkout"
                }`
              : "Your Wishlist Is Empty"}
          </h4>
        </div>
        <div className="wishlist-items">
          {wish?.map((p) => (
            <div className="wishlist-item" key={p._id}>
              <div className="wishlist-item-image">
                <img
                  src={`/api/v1/product/photo-product/${p._id}`}
                  alt={p.name}
                  width={"100px"}
                  height={"100px"}
                  onClick={() => {
                    navigate(`/product-details/${p._id}`);
                  }}
                />
              </div>

              <div className="wishlist-item-content">
                <h4>{p.name}</h4>
                <p>{p.description.substring(0, 30)}</p>
                <p>Price : ${p.price}</p>
              </div>

              <MdOutlineRemoveCircle   
                className="wishlist-item-remove-btn"
                size={"30px"} 
                onClick={() => removeWishItem(p._id)}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default WishlistPage;
