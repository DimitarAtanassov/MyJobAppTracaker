import React, { Component } from "react";
import AddSkillModal from "../components/AddSkillModal";
import { Box } from "@mui/material";
import ProfilePicture from "../components/ProfilePicture";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      profileImageUrl: "", // To store the URL of the uploaded profile image
    };
  }

  // Function to handle image upload
  handleImageChange = (file) => {
    // Assuming you're using a function to upload the image and get its URL asynchronously
    // Replace this with your own logic to upload the image
    uploadImageAndGetUrl(file).then((url) => {
      this.setState({ profileImageUrl: url });
    });
  };

  render() {
    const { profileImageUrl } = this.state;
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        {/* User Profile Text centered at the top */}
        <h2 style={{ marginBottom: "20px" }}>User Profile</h2>

        {/* ProfilePicture component */}
        <ProfilePicture
          profileImageUrl={profileImageUrl}
          onImageChange={this.handleImageChange}
        />

        {/* AddSkillModal as a row under UserProfileText and to the left */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <AddSkillModal />
          {/* Other components or content can be added here */}
        </div>
      </Box>
    );
  }
}

export default UserProfile;
