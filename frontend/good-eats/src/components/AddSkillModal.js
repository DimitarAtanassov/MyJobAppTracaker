import React, { useState } from 'react';
import { Button, Modal, TextField } from '@mui/material';

const AddSkillModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skill, setSkill] = useState('');

  const handleInputChange = (e) => {
    setSkill(e.target.value);
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSaveSkill = () => {
    console.log('Skill saved:', skill);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleModalToggle}>Add Skill</Button>
      <Modal open={isModalOpen} onClose={handleModalToggle}>
        <div className="modal" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
          <h2>Enter Skill</h2>
          <TextField
            type="text"
            placeholder="Enter skill"
            value={skill}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button variant="contained" onClick={handleSaveSkill}>Save</Button>
        </div>
      </Modal>
    </div>
  );
};

export default AddSkillModal;
