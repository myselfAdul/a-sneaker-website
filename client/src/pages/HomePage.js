import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import "./HomePage.scss";
import Hero from "../components/HERO/Hero";
import Offer from "../components/OFFER/Offer";
import { useWish } from "../context/wishList";
import { TbJewishStarFilled } from "react-icons/tb";


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState("");
  const [radio, setRadio] = useState([]);
  const [cart, setCart] = useCart();
  const [wish, setWish] = useWish();

  //  const [total, setTotal] = useState(0);
  //  const [page, setPage] = useState(1);
  //  const [loading, setLoading] = useState(false);
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

  // const getTotal = async () => {
  //   try {
  //     const { data } = await axios.get('/api/v1/product/count-product');
  //     setTotal(data?.total);
  //   } catch (error) {
  //   }
  // }

  // useEffect(() => {
  //   if (page === 1) return;
  //   loadMore();
  // }, [page]);

  // const loadMore = async () => {
  //   try {
  //     setLoading(true);
  //     const { data } = await axios.get(`/api/v1/product/list-product/${page}`);
  //     setLoading(false);
  //     setProducts([...products, ...data?.products]);
  //   } catch (error) {
  //     setLoading(false);
  //   }
  // }

  const handleFilter = (id) => {
    setChecked(id);
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
      <div className="home">
        <div className="filter">
          <h4>Category</h4>
          <div className="category">
            <Checkbox
              checked={checked === "regular"}
              onChange={() => handleFilter("regular")}
            >
              Regular
            </Checkbox>
            <Checkbox
              checked={checked === "exclusive"}
              onChange={() => handleFilter("exclusive")}
            >
              Exclusive
            </Checkbox>
          </div>
          <h4>Price Range</h4>
          <div className="filter-price">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio className="radio-price" value={p.array}>
                    {p.name}
                  </Radio>
                  <hr />
                </div>
              ))}
            </Radio.Group>
          </div>
          <div>
            <button
              className="reset-btn"
              onClick={() => window.location.reload()}
            >
              RESET
            </button>
          </div>
        </div>

        <div className="products">
          <Hero className="hero-card" />

          <h1>All Products</h1>
          <hr />
          <div className="product-grid">
            {products?.map((p) => (
              <div className="product" key={p._id}>
                <img
                  src={`/api/v1/product/photo-product/${p._id}`}
                  alt={p.name}
                  onClick={() => {
                    navigate(`/product-details/${p._id}`);
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 25)}...
                  </p>

                  <div className="price pwish">
                    <div className="price">
                      <p className="card-price">$ {p.newPrice} </p>
                      <p className="old_price">$ {p.price} </p>

                    </div>
                    

                    <TbJewishStarFilled className="wish-btn" size={'25px'}
                      onClick={() => {
                        setWish([...wish, p]);
                        localStorage.setItem(
                          "wish",
                          JSON.stringify([...wish, p])
                        );
                      }} />

                  </div>

                  {/* <p className="card-price">$ {p.newPrice} </p>
                    <p className="old_price">$ {p.price} </p> */}

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

          <Offer />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
