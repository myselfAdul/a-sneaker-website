import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import './UpdateProduct.scss'

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.pid}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setNewPrice(data.product.newPrice);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category);
    } catch (error) {
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);


  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("newPrice",newPrice)
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
      } else {
        navigate("/dashboard/admin/show-products");
      }
    } catch (error) {
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
    //   let answer = window.prompt("Are You Sure want to delete this product ? ");
    //   if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${params.pid}`
      );
      navigate("/dashboard/admin/show-products");
    } catch (error) {
    }
  };
  return (
    <Layout>
      <div className="update-product">
        <div className="dash-card">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="right">
            <h1>Update Product</h1>
            <div className="right-main-body">
              
              <div className="right1">
              <Select placeholder="Select Category" size='large' showSearch className='form-select mb-3' onChange={(value)=>{setCategory(value)}}>
                                <Option value="regular">Regular</Option>
                                <Option value="exclusive">Exclusive</Option>

                              </Select>
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
            
             
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/product/photo-product/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              
           
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
             
            
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />

              </div>
            
         
                <div className="right2">
                  <input
                    type="number"
                    value={price}
                    placeholder="Old Price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />

                  <input type='number' value={newPrice} onChange={(e)=>{setNewPrice(e.target.value)}} placeholder='New price' className='form-control'/>
              

                  <input
                    type="number"
                    value={quantity}
                    placeholder="write a quantity"
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
    
            
                  <Select
                    placeholder="Select Shipping "
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                    value={shipping ? "yes" : "No"}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
        
        
                  <button className="btn btn-primary" onClick={handleUpdate}>
                    UPDATE PRODUCT
                  </button>
          
              
                  <button className="btn btn-danger" onClick={handleDelete}>
                    DELETE PRODUCT
                  </button>

                </div>
         
                
          
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;