import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu.js";
import Layout from "../../components/Layout/Layout.js";
import axios from "axios";
import { Link } from "react-router-dom";

import './ShowProduct.scss'

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="show-product">
        <AdminMenu />
        
        <div className="items">
          <h1>update Products <hr /></h1>

          <div className="item">
            {products?.map((p) => (
                <Link key={p._id} to={`/dashboard/admin/product/${p._id}`} className="product-link">
                    <div>
                <img src={`/api/v1/product/photo-product/${p._id}`} className="card-img-top" alt={p.name} height='200px' />
                <div className="card-body">
                  <h5>{p.name}</h5>
                  <p className="item-desc">{p.description.substring(0, 35)}...</p>
                </div>
              </div>
                </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
