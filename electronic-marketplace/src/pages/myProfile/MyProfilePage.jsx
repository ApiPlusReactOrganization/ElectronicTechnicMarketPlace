import React from "react";
import UserImage from "./components/UserImage"
import UserProfileForm from "./components/UserProfileForm";

const MyProfilePage = () => {
  return (
    <div className="d-flex gap-3 my-3 justify-content-between align-items-center container">
      <UserImage />
      <UserProfileForm />
    </div>
  );
};

export default MyProfilePage;
