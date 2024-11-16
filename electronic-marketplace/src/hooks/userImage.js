import NoImageUser from "../assets/images/noImgUser.png"


const userImage = (userImage) => {
    if(userImage !== undefined)
        return userImage === "N/A" ? NoImageUser : `http://localhost:5132/Images/userImages/${userImage}`
    else
        return NoImageUser;
}

export default userImage