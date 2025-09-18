import React from 'react'
import Layout from './../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';
// import "../styles/AdminDashboardStyle.css";

const AdminDashboard = () => {
  const[auth] = useAuth();
  
  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu/>
          </div>
          <div className='col-md-9'>
            <div className='welcome-message'>
              <h2>Welcome to Admin Dashboard</h2>
              <p>Manage your store efficiently with all the tools at your disposal</p>
            </div>
            
            <div className='card w-75 p-3'>
              <span className='admin-badge'>Admin</span>
              <h3>Admin name : {auth?.user?.name}</h3>
              <h3>Admin email : {auth?.user?.email}</h3>
              <h3>Admin contact : {auth?.user?.phone}</h3>
            </div>
            
            <div className='admin-stats'>
              <div className='stat-item'>
                <div className='stat-value'>152</div>
                <div className='stat-label'>Total Products</div>
              </div>
              <div className='stat-item'>
                <div className='stat-value'>24</div>
                <div className='stat-label'>Pending Orders</div>
              </div>
              <div className='stat-item'>
                <div className='stat-value'>1,258</div>
                <div className='stat-label'>Total Sales</div>
              </div>
            </div>
            
            <div className='quick-actions'>
              <h4>Quick Actions</h4>
              <div className='action-buttons'>
                <a href="/dashboard/admin/products" className='action-btn'>
                  <span>Manage Products</span>
                </a>
                <a href="/dashboard/admin/orders" className='action-btn'>
                  <span>View Orders</span>
                </a>
                <a href="/dashboard/admin/users" className='action-btn'>
                  <span>Manage Users</span>
                </a>
                <a href="/dashboard/admin/create-product" className='action-btn'>
                  <span>Add New Product</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard