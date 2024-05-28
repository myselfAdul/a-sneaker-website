import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { useWish } from "../context/wishList.js";

import { TbJewishStarFilled } from "react-icons/tb";

const Regular = () => {
  const [regularProducts, setRegularProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [wish, setWish] = useWish();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRegularProducts();
  }, []);

  const fetchRegularProducts = async () => {
    try {
      const response = await axios.get("/api/v1/product/regular-products");
      setRegularProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching regular products:", error);
    }
  };

  return (
    <Layout>
      <div className="products">
        <h1>Regular Products</h1>
        <hr />
        <div className="product-grid">
          {regularProducts?.map((product) => (
            <div className="product" key={product._id}>
              <img
                src={`/api/v1/product/photo-product/${product._id}`}
                alt={product.name}
                onClick={() => {
                  navigate(`/product-details/${product._id}`);
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  {product.description.substring(0, 25)}...
                </p>
                {/* <p className="card-price">$ {product.price}</p> */}

                <div className="price pwish">
                  <div className="price">
                    <p className="card-price">$ {product.newPrice} </p>
                    <p className="old_price">$ {product.price} </p>
                  </div>

                  <TbJewishStarFilled
                    className="wish-btn"
                    size={"25px"}
                    onClick={() => {
                      setWish([...wish, product]);
                      localStorage.setItem(
                        "wish",
                        JSON.stringify([...wish, product])
                      );
                    }}
                  />
                </div>

                <div className="dc-btn">
                  <button
                    className="btn "
                    onClick={() => {
                      navigate(`/product-details/${product._id}`);
                    }}
                  >
                    DETAILS
                  </button>
                  <button
                    className="btn "
                    onClick={() => {
                      setCart([...cart, product]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, product])
                      );
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Regular;
