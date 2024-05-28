import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import axios from 'axios'

import './UserProfile.scss'


const Profile = () => {
    const [auth,setAuth] = useAuth()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    useEffect(()=>{
        const {name,email,phone,address} = auth?.user
        setName(name)
        setEmail(email)
        setPhone(phone)
        setAddress(address)
    },[auth?.user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const {data} = await axios.put("/api/v1/auth/profile", {
            name,
            email,
            password,
            phone,
            address,
          });
          if(data?.error){

          }
          else{
            setAuth({...auth,user:data?.updatedUser})
            let ls = localStorage.getItem('auth');
            ls = JSON.parse(ls)
            ls.user = data.updatedUser
            localStorage.setItem('auth',JSON.stringify(ls))

          }
        } catch (error) {

        }
      };


      return (
        <Layout>
          <div className='profile'>
            <UserMenu />
            <div className="form">
              <form onSubmit={handleSubmit}>
                <h4 >{auth?.user?.name}'s PROFILE</h4>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="exampleInputEmail1"
                  placeholder="Enter Your Name"
                  autoFocus
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="exampleInputEmail1"
                  placeholder="Enter Your Email "
                  disabled
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="new Password"
                />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
          
                  id="exampleInputEmail1"
                  placeholder="Enter Your Phone"
                />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
            
                  id="exampleInputEmail1"
                  placeholder="Enter Your Address"
                />
                <button type="submit">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </Layout>
      );
      
      
}

export default Profile