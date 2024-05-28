// Search.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";

import "./Search.scss";

const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  return (
    <Layout>
      <div className="search-product">
        <div>
          <h1>Search Results</h1>
          <h4>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} product(s)`}
          </h4>
          <div className="product-grid">
            {values?.results.map((p) => (
              <div className="product" key={p._id}>
                <img
                  src={`/api/v1/product/photo-product/${p._id}`}
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-description">
                    {p.description.substring(0, 25)}...
                  </p>
                  <div className="price">
                    <p className="card-price">$ {p.newPrice}</p>
                    <p className="old_price">$ {p.price}</p>
                  </div>
                  <div className="dc-btn">
                    <button
                      className="btn "
                      onClick={() => {
                        navigate(`/product-details/${p._id}`);
                      }}
                    >
                      DETAILS
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
      </div>
    </Layout>
  );
};

export default Search;
