import { TextField, Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import useActions from "../../hooks/useActions";
import { toast } from "react-toastify";
import userImage from "../../hooks/userImage";

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
    const formData = new FormData();
    formData.append("imageFile", selectedFile);

    const result = await uploadImage(currentUser.id, formData);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(`Error: ${result.message}`);
    }
  };

  return (
    <div className="d-flex gap-3 my-3 justify-content-between align-items-center">
      <div className="d-flex gap-3 flex-column align-items-center">
        <img
          src={userImage(currentUser?.image)}
          className="rounded-circle"
          height="200"
          width="200"
          alt="User Avatar"
          loading="lazy"
        />
        <div className="d-flex gap-3 align-items-center">
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/gif"
          />
          <button
            type="button"
            className="btn btn-primary"
            style={{ whiteSpace: "nowrap" }}
            onClick={handleSaveImage}
          >
            Change Image
          </button>
        </div>
      </div>
      <div>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="filled-basic"
            label="Name"
            variant="filled"
            value={currentUser.name}
          />
          <TextField
            id="filled-basic"
            label="Email"
            variant="filled"
            disabled
            defaultValue={currentUser.email}
          />
        </Box>
        <button type="button" className="btn btn-primary float-end">
          Оновити
        </button>
      </div>
    </div>
  );
};

export default MyProfilePage;
