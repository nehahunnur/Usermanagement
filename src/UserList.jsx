import React, { useState, useEffect } from "react";
import { getUsers, addUser, editUser, deleteUser } from "./api";
import "./styles.css";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Show 5 users per page

  // Fetch users with pagination
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers(currentPage, usersPerPage);
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          setError("Failed to load users: Invalid data format.");
        }
      } catch (err) {
        setError("Failed to load users");
      }
    };
    fetchUsers();
  }, [currentPage]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    });
    setError("");
  };

  const handleAddUser = () => {
    setIsEditing(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.department
    ) {
      setError("All fields are required.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(""); // Reset error before submission

    try {
      if (isEditing) {
        await editUser(formData.id, formData);
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === formData.id ? formData : user))
        );
      } else {
        const newUser = await addUser(formData);
        setUsers((prevUsers) => [...prevUsers, newUser]);
      }
      resetForm();
    } catch (err) {
      setError("Failed to add or update user");
    }
  };

  const handleEditUser = (user) => {
    setIsEditing(true);
    setFormData({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      department: user.department,
    });
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  const handlePageChange = (direction) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="container">
      <h1>User Management</h1>
      {error && <p className="error">{error}</p>}
      <button className="add-user" onClick={handleAddUser}>
        Add User
      </button>
      <form onSubmit={handleSubmit}>
        <h3>{isEditing ? "Edit User" : "Add User"}</h3>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleFormChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleFormChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleFormChange}
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleFormChange}
        />
        <button type="submit">{isEditing ? "Update" : "Add"} User</button>
      </form>
      <ul>
        {users.length === 0 ? (
          <p>No users available</p>
        ) : (
          users.map((user) => (
            <li key={user.id}>
              <p>
                {user.firstName} {user.lastName} - {user.email} -{" "}
                {user.department}
              </p>
              <button onClick={() => handleEditUser(user)}>Edit</button>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
      <div className="pagination">
        <button onClick={() => handlePageChange("prev")}>Previous</button>
        <span>Page {currentPage}</span>
        <button onClick={() => handlePageChange("next")}>Next</button>
      </div>
    </div>
  );
};

export default UserList;
