import React, { useState } from "react";
import UserList from "./UserList";
import UserForm from "./UserForm";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setCurrentUser(null);
  };

  return (
    <div>
      <h1>User Management</h1>
      {!showForm && (
        <>
          <button onClick={() => setShowForm(true)}>Add User</button>
          <UserList onEdit={handleEdit} />
        </>
      )}
      {showForm && <UserForm currentUser={currentUser} onSave={handleSave} />}
    </div>
  );
};

export default App;
