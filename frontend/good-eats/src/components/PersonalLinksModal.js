import React, { useState } from 'react';
import { Button, Modal, TextField } from '@mui/material';

const PersonalLinksModal = ({ onSaveLink }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkSource, setLinkSource] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const handleSourceChange = (e) => {
    setLinkSource(e.target.value);
  };

  const handleUrlChange = (e) => {
    setLinkUrl(e.target.value);
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSaveLink = () => {
    onSaveLink(linkSource, linkUrl); // Pass source and url separately
    setIsModalOpen(false);
  };
  return (
    <div>
      <Button variant="contained" onClick={handleModalToggle}>Add Link</Button>
      <Modal open={isModalOpen} onClose={handleModalToggle}>
        <div className="modal" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
          <h2>Enter Link</h2>
          <TextField
            type="text"
            placeholder="Source"
            value={linkSource}
            onChange={handleSourceChange}
            fullWidth
            margin="normal"
            variant="outlined"
            style={{ marginBottom: '10px' }}
          />
          <TextField
            type="text"
            placeholder="URL"
            value={linkUrl}
            onChange={handleUrlChange}
            fullWidth
            margin="normal"
            variant="outlined"
            style={{ marginBottom: '20px' }}
          />
          <Button variant="contained" onClick={handleSaveLink}>Save</Button>
        </div>
      </Modal>
    </div>
  );
};

export default PersonalLinksModal;
