import React from "react";
import { useSelector } from "react-redux";
import UserImage from "./components/UserImage";
import UserProfileForm from "./components/UserProfileForm";

const MyProfilePage = () => {
  const { id, image, name, email } = useSelector((store) => store.user.currentUser);
  // console.log("MyProfilePage")
  return (
    <div className="d-flex gap-3 my-3 justify-content-between align-items-center container">
      <UserImage userId={id} image={image} />
      <UserProfileForm id={id} name={name} email={email} />
    </div>
  );
};

export default MyProfilePage;
