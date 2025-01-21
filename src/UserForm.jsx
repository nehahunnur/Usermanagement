import React, { useState, useEffect } from "react";
import { addUser, editUser } from "./api";

const UserForm = ({ currentUser, onSave }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    if (currentUser) {
      setUser({ ...currentUser });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.name || !user.email || !user.department) {
      alert("Please fill in all fields.");
      return;
    }

    if (currentUser) {
      editUser(currentUser.id, user)
        .then(() => {
          onSave();
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to edit user.");
        });
    } else {
      addUser(user)
        .then(() => {
          onSave();
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to add user.");
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="on">
      <h2>{currentUser ? "Edit User" : "Add User"}</h2>

      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={user.name}
          onChange={handleChange}
          required
          autoComplete="name"
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor="department">Department:</label>
        <input
          type="text"
          id="department"
          name="department"
          value={user.department}
          onChange={handleChange}
          required
          autoComplete="organization-title"
        />
      </div>

      <button type="submit">Save</button>
    </form>
  );
};

export default UserForm;
