import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

const DeleteButton = ({onClick}) => {
    return (
        <IconButton aria-label="delete" onClick={onClick}>
            <DeleteIcon />
        </IconButton>
    )
}

export default DeleteButton;