import React, { Component } from "react";
import AddSkillModal from "../components/AddSkillModal";
import { Box } from "@mui/material";
import ProfilePicture from "../components/ProfilePicture";
import { getUserSkillsService, updateSkillsService, getUserByIdService, addUserLinkService, getUserLinksService } from "../utils/apiService";
import LoginRegisterButton from "../components/LoginRegisterButton";
import PersonalLinksModal from "../components/PersonalLinksModal";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      profileImageUrl: "", // To store the URL of the uploaded profile image
      links: []
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
      await this.fetchUserLinks();
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

  fetchUserLinks = async () => 
  {
    try
    {
      const links = await getUserLinksService();
      this.setState({ links });
    }
    catch (error)
    {
      console.error("Error fetching user social media links:", error.message);
    }
  }

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

  updateSocialMediaLinks = async(linkSource,newLink) =>
  {
    try
    {
      await addUserLinkService(linkSource,newLink);
      await this.fetchUserLinks();
    }
    catch (error)
    {
      console.error("Error updating user social media links:", error.message);
    }
  }

  handleImageChange = (imageUrl) => {
    this.setState({ profileImageUrl: imageUrl });
  };

  render() {
    const { skills, profileImageUrl, user, links } = this.state;
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        {/* Display user's username if available */}
        {user && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <h2 style={{ marginBottom: "20px" }}>
              {user.username}'s Profile
            </h2>
          </div>
        )}
        {/* Profile Picture */}
        <div >
          <ProfilePicture
            profileImageUrl={profileImageUrl}
            onImageChange={this.handleImageChange}
          />
        </div>
        {/* Social Media Links List */}
        <div>
        <ul style={{ listStyleType: "none", padding: 0, paddingLeft: "100px" }}>
            {links.map((link, index) => (
              <li key={index}>
                {/* Display the source followed by the URL */}
                <span>{link.source}:</span>{" "}
                <a href={link.link} target="_blank" rel="noopener noreferrer">
                  {link.link}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Add Skill Modal */}
        {/* Skills List */}
        <div style={{ textAlign: "center" }}>
          <h3>Skills:</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
      </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", marginTop: "10px" }}>
          <PersonalLinksModal onSaveLink={this.updateSocialMediaLinks} />
          <div style={{ marginLeft: "10px" }}></div> {/* Adjust the amount of space */}
          <AddSkillModal onSaveSkill={this.updateSkills} />
      </div>
      <LoginRegisterButton dest="/jobapps" buttonLabel="Back to Job Apps" />

      </Box>
    );
  }
  
  
}

export default UserProfile;
