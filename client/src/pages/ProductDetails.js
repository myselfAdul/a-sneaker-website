import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

import star from "../components/assets/star_icon.png";
import star_fade from "../components/assets/star_dull_icon.png";

import "./ProductDetails.scss";
import CopyToClipboardButton from "../components/COPYCLIPBOARD/CopyToCLipboardButton";
import Breadcrum from "../components/Breadcrumbs/Breadcrum";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();

  //initalp details
  useEffect(() => {
    if (params?.pid) getProduct();
  }, [params?.pid]);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.pid}`
      );
      setProduct(data?.product);
    } catch (error) {}
  };

  return (
    <Layout>
      {/* <div className="breadcrum">
        HOME <img src={arrow_icon} alt="" /> {product.category}{" "}
        <img src={arrow_icon} alt="" /> {product.name}
      </div> */}
      <Breadcrum category={product.category} productName={product.name} />


      <div className="product-display">
        <div className="product-display-left">
          <div className="product-display-image">
            <img
              className="product-display-main-image"
              src={`/api/v1/product/photo-product/${product._id}`}
              alt={product.name}
            />
          </div>
        </div>

        <div className="product-display-right">
          <h1>{product.name}</h1>

          <div className="product-display-star">
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star_fade} alt="" />
            <p>(200)</p>
          </div>

          <div className="product-display-right-price">
            <div className="new-price">${product.newPrice}</div>
            <div className="old-price">${product.price}</div>
          </div>
          <div className="product-display-desc">
            <p>{product.description}</p>
          </div>

          <button
            className="btn"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
            }}
          >
            ADD TO CART
          </button>
        </div>
        <CopyToClipboardButton />
      </div>
    </Layout>
  );
};

export default ProductDetails;
