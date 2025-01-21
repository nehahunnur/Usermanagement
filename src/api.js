import axios from "axios";

// Base URL for JSONPlaceholder API
const API_URL = "https://jsonplaceholder.typicode.com/users";

// Get all users
const getUsers = async (currentPage, usersPerPage) => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users`
    );
    return { data: response.data }; // Ensure it's wrapped in a "data" key.
  } catch (err) {
    throw new Error("Failed to fetch users");
  }
};

// Add a new user (simulated, will not actually add to the database)
export const addUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data; // Simulate the addition of a new user
  } catch (error) {
    throw new Error("Failed to add user");
  }
};

// Edit an existing user
export const editUser = async (id, updatedUserData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedUserData);
    return response.data; // Return updated user data
  } catch (error) {
    throw new Error("Failed to edit user");
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id; // Return the deleted user's ID
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};
