import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'
import './AdminDash.scss'

const AdminDashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout>
        <div className='admin-dashboard'>
          <h4>Admin Panel <hr /></h4>
          <div className='dash-card'>
            <div className='menu'>
              <AdminMenu/>
            </div>
            <div className='right'>
              <div className='admin-desc' style={{color:'white'}} >
                <h1>Admin Name : {auth?.user?.name}</h1>
                <h2>Admin Email : {auth?.user?.email}</h2>
                <h2>Admin Contact : {auth?.user?.phone}</h2>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default AdminDashboard