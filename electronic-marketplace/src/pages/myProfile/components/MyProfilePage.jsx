import React from "react";
import UserImage from "./UserImage"
import UserProfileForm from "./UserProfileForm";

const MyProfilePage = () => {
  return (
    <div className="d-flex gap-3 my-3 justify-content-between align-items-center">
      <UserImage />
      <UserProfileForm />
    </div>
  );
};

export default MyProfilePage;
