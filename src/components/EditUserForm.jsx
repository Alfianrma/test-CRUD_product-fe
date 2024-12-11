import React, { useState } from "react";
import axios from "axios";

function EditUserForm({ closeModal, userId }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      const payload = {};

      if (username) payload.username = username;
      if (email) payload.email = email;
      if (password) payload.password = password;

      if (Object.keys(payload).length === 0) {
        alert("Please fill in at least one field to update");
        return;
      }

      console.log("token:", localStorage.getItem("token"));

      const response = await axios.patch(
        `http://localhost:3000/user/${userId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Profile updated");
      closeModal();
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Failed to update user");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
        <form onSubmit={handleConfirm}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md font-medium"
            >
              Confirm
            </button>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md font-medium"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserForm;
