import React, { useState } from "react";
import { useSelector } from "react-redux";
import useActions from "../../../hooks/useActions";
import { toast } from "react-toastify";

const UserProfileForm = () => {
  const currentUser = useSelector((store) => store.user.currentUser);
  const { updateUser } = useActions();

  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateUser = async () => {
    if (!formData.name || !formData.email) {
      toast.error("Please fill in all fields.");
      return;
    }

    const result = await updateUser(currentUser.id, {
      userName: formData.name,
      email: formData.email,
    });

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(`Error: ${result.message}`);
    }
  };

  return (
    <div className="w-50">
      <form>
        <div className="input-group mb-3">
          <span className="input-group-text">Username</span>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Email</span>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleInputChange}
          />
          <span className="input-group-text" id="basic-addon2">
            @example.com
          </span>
        </div>
      </form>
      <button
        type="button"
        className="btn btn-primary float-end"
        onClick={handleUpdateUser}
      >
        Оновити
      </button>
    </div>
  );
};

export default UserProfileForm;
