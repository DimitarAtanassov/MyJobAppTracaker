import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

const DeleteButton = ({onClick}) => {
    return (
        <IconButton aria-label="delete" onClick={onClick} style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
            <DeleteIcon  sx={{ fontSize: 40 }}/>
        </IconButton>
    )
}

export default DeleteButton;