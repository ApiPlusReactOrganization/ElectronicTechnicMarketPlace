import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import useActions from "../../hooks/useActions";
import { toast } from "react-toastify";


const MyProfilePage = () => {
  const { currentUser } = useSelector((store) => store.user);
  const { uploadImage } = useActions();
  console.log(currentUser);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleSaveImage = async () => {
    if (!selectedFile) {
      toast.error("Please select an image to upload.");
      return;
    }
    const user = currentUser;
    const formData = new FormData();
    formData.append("imageFile", selectedFile);

    const result = await uploadImage(user.id, formData);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(`Error: ${result.message}`);
    }
  };

  return (
    <div>
      <div className="d-flex gap-3 my-3">
        <label htmlFor="formFile" className="form-label">
          Change image
        </label>
        <div>
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <div>
          <button type="button" className="btn btn-primary" onClick={handleSaveImage}>
            Save Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
