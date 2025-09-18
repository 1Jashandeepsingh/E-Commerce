import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu"; // ✅ fixed import (was importing Layout instead of AdminMenu earlier)
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import { useAuth } from "../../context/auth";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  // ----------------- STATE -----------------
  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered", // ✅ fixed typo (was 'deliverd')
    "Cancelled", // ✅ fixed typo (was 'cancel')
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  // ----------------- API CALL -----------------
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders", {
        headers: {
          Authorization: auth?.token, // ✅ ensure token is sent
        },
      });
      setOrders(data);
    } catch (error) {
      console.log(
        "Error fetching orders:",
        error.response?.data || error.message
      );
      toast.error("Failed to fetch orders");
    }
  };

  // ----------------- EFFECT -----------------
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId , value) => {
    try {
      const {data} = await axios.put(`/api/v1/auth/order-status/${orderId}` , {status:value});
      getOrders();
    } catch (error) {
      console.log(error);
    }
  }

  // ----------------- RENDER -----------------
  return (
    <Layout title="All Orders Data">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <AdminMenu />
        </div>

        {/* Orders Section */}
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>

          {orders.map((o, i) => (
            <div className="border shadow mb-3" key={i}>
              {/* Order Table */}
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Buyer</th>
                    <th scope="col">Date</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{i + 1}</td>
                    <td>
                      <Select
                        bordered={false}
                        onChange={(value) => {
                          handleChange(o._id , value);
                        }}
                        defaultValue={o?.status}
                      >
                        {status.map((s, i) => (
                          <Option key={i} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </td>
                    <td>{o?.buyer?.name}</td>
                    <td>{moment(o?.createdAt).fromNow()}</td>
                    <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                    <td>{o?.products?.length}</td>
                  </tr>
                </tbody>
              </table>

              {/* Products inside order */}
              <div className="container">
                {o?.products?.map((p) => (
                  <div className="row mb-2 p-3 card flex-row" key={p._id}>
                    <div className="col-md-4">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        width="100px"
                        height="100px"
                      />
                    </div>
                    <div className="col-md-8">
                      <p>{p.name}</p>
                      <p>{p.description.substring(0, 30)}</p>
                      <p>Price : {p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
