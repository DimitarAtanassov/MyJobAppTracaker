import React from "react";
import { Avatar } from "@mui/material";

const ProfilePicture = ({ profileImageUrl, onImageChange }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    onImageChange(file);
  };

  return (
    <label htmlFor="profile-picture-input">
      {/* If profile image URL is available, display the uploaded image */}
      {profileImageUrl ? (
        <Avatar
          alt="Profile Picture"
          src={profileImageUrl}
          sx={{ width: 100, height: 100, marginBottom: "20px" }}
        />
      ) : (
        // If no profile image URL, display placeholder
        <Avatar
          alt="Profile Picture"
          sx={{ width: 100, height: 100, marginBottom: "20px" }}
        />
      )}
      {/* Input for uploading profile picture */}
      <input
        accept="image/*"
        id="profile-picture-input"
        type="file"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
    </label>
  );
};

export default ProfilePicture;
