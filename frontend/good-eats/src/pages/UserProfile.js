import React, { Component } from "react";
import AddSkillModal from "../components/AddSkillModal";
import { Box } from "@mui/material";
import ProfilePicture from "../components/ProfilePicture";
import { getUserSkillsService, updateSkillsService, getUserByIdService } from "../utils/apiService";
import LoginRegisterButton from "../components/LoginRegisterButton";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      profileImageUrl: "", // To store the URL of the uploaded profile image
    };
  }

  componentDidMount() {
    // Fetch user skills when the component mounts
    this.fetchUserSkills();
    this.fetchUserProfile();
  }

  fetchUserProfile = async () => {
    try {
      const userData = await getUserByIdService(); // Assuming this function returns the user's data including profile image URL
      // Set the profile image URL and user object in the state
      this.setState({
        profileImageUrl: userData.profileImage,
        user: userData
      });
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
    }
  };

  // Function to fetch user skills from the backend
  fetchUserSkills = async () => {
    try {
      const skills = await getUserSkillsService();
      this.setState({ skills });
    } catch (error) {
      console.error("Error fetching user skills:", error.message);
    }
  };

  updateSkills = async (newSkill) => {
    try {
      // Call the backend service to update skills
      await updateSkillsService(newSkill);
      // After updating skills, fetch and update the user's skills
      await this.fetchUserSkills();
    } catch (error) {
      console.error("Error updating user skills:", error.message);
    }
  };

  handleImageChange = (imageUrl) => {
    this.setState({ profileImageUrl: imageUrl });
  };

  render() {
    const { skills, profileImageUrl, user } = this.state;
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <div style={{ marginLeft: "auto", marginRight: "500px"}}>
              <LoginRegisterButton dest="/jobApps" buttonLabel="Back to Job Apps" />
        </div>
        {/* Display user's username if available */}
        {user && (
          <div style={{ display: "flex", alignItems: "center"  }}>
            <h2 style={{ marginBottom: "20px" }}>
              {user.username}'s Profile
            </h2>
          </div>
        )}
        {/* Separate box for profile picture, add skill, and skill list */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginTop="20px" // Add some margin from the header
        >
          {/* Profile Picture */}
          <ProfilePicture
            profileImageUrl={profileImageUrl}
            onImageChange={this.handleImageChange}
          />
          {/* Add Skill Modal */}
          <AddSkillModal onSaveSkill={this.updateSkills} />
          {/* Skills List */}
          <div style={{ marginLeft: "-10px" }}> {/* Adjust left margin */}
            <h3>Skills:</h3>
            <ul>
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </Box>
      </Box>
    );
  }
}

export default UserProfile;
