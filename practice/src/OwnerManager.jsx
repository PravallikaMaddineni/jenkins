import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import config from "./config.js";

const OwnerManager = () => {
  const [owners, setOwners] = useState([]);
  const [owner, setOwner] = useState({
    id: "",
    name: "",
    email: "",
    gender: "",
    contact: ""
  });
  const [message, setMessage] = useState("");

  const baseUrl = `${config.url}/owner`;

  useEffect(() => {
    fetchAllOwners();
  }, []);

  const fetchAllOwners = async () => {
    try {
      const res = await axios.get(`${baseUrl}/viewall`);
      setOwners(res.data);
    } catch (error) {
      setMessage("Failed to fetch owners.");
    }
  };

  const handleChange = (e) => {
    setOwner({ ...owner, [e.target.name]: e.target.value });
  };

  const addOwner = async () => {
    try {
      await axios.post(`${baseUrl}/addowner`, owner);
      setMessage("Owner added successfully.");
      fetchAllOwners();
      resetForm();
    } catch (error) {
      setMessage("Error adding owner.");
    }
  };

  const deleteOwner = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllOwners();
    } catch (error) {
      setMessage("Error deleting owner.");
    }
  };

  const resetForm = () => {
    setOwner({
      id: "",
      name: "",
      email: "",
      gender: "",
      contact: ""
    });
  };

  return (
    <div className="student-container">
      {message && (
        <div
          className={`message-banner ${
            message.toLowerCase().includes("error") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}

      <h2>Owner Management</h2>

      <div className="form-grid">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={owner.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={owner.email}
          onChange={handleChange}
        />
        <select name="gender" value={owner.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="MALE">MALE</option>
          <option value="FEMALE">FEMALE</option>
        </select>
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={owner.contact}
          onChange={handleChange}
        />
      </div>

      <div className="btn-group">
        <button className="btn-blue" onClick={addOwner}>
          Add Owner
        </button>
        <button className="btn-gray" onClick={resetForm}>
          Reset
        </button>
      </div>

      <h3>All Owners</h3>
      {owners.length === 0 ? (
        <p>No owners found.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {owners.map((own) => (
                <tr key={own.id}>
                  <td>{own.id}</td>
                  <td>{own.name}</td>
                  <td>{own.email}</td>
                  <td>{own.gender}</td>
                  <td>{own.contact}</td>
                  <td>
                    <button
                      className="btn-red"
                      onClick={() => deleteOwner(own.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OwnerManager;
