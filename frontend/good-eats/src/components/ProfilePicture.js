// ProfilePicture.js
import React, { useState } from "react";
import { Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { updateProfilePictureService } from "../utils/apiService";

const ProfilePicture = ({ profileImageUrl, onImageChange }) => {
  const [open, setOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");

  const handleImageChange = (event) => {
    const imageUrl = event.target.value;
    setNewImageUrl(imageUrl);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      // Make the API call to update the user's profile picture
      await updateProfilePictureService(newImageUrl);
      
      // If the API call is successful, update the profile picture in the frontend
      onImageChange(newImageUrl);
      setNewImageUrl("");
      setOpen(false);
    } catch (error) {
      console.error('Error updating profile picture:', error);
      // Handle error, display a message to the user, etc.
    }
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          display: "inline-block",
          transition: "transform 0.3s ease-in-out",
          cursor: "pointer",
        }}
        onClick={handleClick}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        <Avatar
          alt="Profile Picture"
          src={profileImageUrl}
          sx={{ width: 100, height: 100, marginBottom: "20px" }}
        />
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Change Profile Picture</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Image URL"
            type="url"
            fullWidth
            value={newImageUrl}
            onChange={handleImageChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfilePicture;