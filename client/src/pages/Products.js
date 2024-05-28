import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState("");
  const [radio, setRadio] = useState([]);
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      //setLoading(true);
      const { data } = await axios.get(`/api/v1/product/get-product`);
      //setLoading(false);
      setProducts(data.products);
    } catch (error) {
      // setLoading(false);
    }
  };

  useEffect(() => {
    if (!checked || !radio.length) getAllProducts();
  }, [checked, radio.length]);

  useEffect(() => {
    if (checked || radio.length) filterProduct();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/filter-product", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {}
  };
  return (
    <Layout>
      <div className="products">
        <h1>Products Page</h1>

        <div className="product-grid">
          {products?.map((p) => (
            <div className="product" key={p._id}>
              <img
                src={`/api/v1/product/photo-product/${p._id}`}
                alt={p.name}
              />

              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 25)}...</p>
                {/* <p className="card-price">$ {p.price}</p> */}
                <div className="price">
                  <p className="card-price">$ {p.newPrice} </p>
                  <p className="old_price">$ {p.price} </p>
                </div>

                <div className="dc-btn">
                  <button
                    className="btn "
                    onClick={() => {
                      navigate(`/product-details/${p._id}`);
                    }}
                  >
                    More Details
                  </button>
                  <button
                    className="btn "
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
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

export default Products;
