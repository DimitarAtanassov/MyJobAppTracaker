import { Button, Dialog, DialogTitle, DialogContent } from '@mui/material'; // Import the necessary components from MUI

const MiniWindow = ({ open, onClose, children }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle  style={{ textAlign: 'center' }}>Job Applications</DialogTitle>
            <DialogContent dividers style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', maxHeight: '100vh' }}>
                {children}
                <Button onClick={onClose}>Close</Button>
            </DialogContent>
        </Dialog>
    );
};

export default MiniWindow;
