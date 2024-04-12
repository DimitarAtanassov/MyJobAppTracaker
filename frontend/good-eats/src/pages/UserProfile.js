import React, { Component } from "react";
import AddSkillModal from "../components/AddSkillModal";
import { Box } from "@mui/material";
import ProfilePicture from "../components/ProfilePicture";
import { getUserSkillsService,updateSkillsService } from "../utils/apiService";

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
  }

  // Function to fetch user skills from the backend
  fetchUserSkills = async () => {
    try {
      const skills = await getUserSkillsService();
      this.setState({ skills });
    } catch (error) {
      console.error('Error fetching user skills:', error.message);
    }
  };

  updateSkills = async (newSkill) => {
    try {
      // Call the backend service to update skills
      await updateSkillsService(newSkill);
      // After updating skills, fetch and update the user's skills
      await this.fetchUserSkills();
    } catch (error) {
      console.error('Error updating user skills:', error.message);
    }
  };
  // // Function to handle image upload
  // handleImageChange = (file) => {
  //   // Assuming you're using a function to upload the image and get its URL asynchronously
  //   // Replace this with your own logic to upload the image
  //   uploadImageAndGetUrl(file).then((url) => {
  //     this.setState({ profileImageUrl: url });
  //   });
  // };

  render() {
    const { skills } = this.state;
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

        {/* AddSkillModal as a row under UserProfileText and to the left */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <AddSkillModal onSaveSkill={this.updateSkills}/>
          {/* Other components or content can be added here */}
        </div>

        <div>
          <h3>Skills:</h3>
          <ul>
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </Box>
    );
  }
}

export default UserProfile;
