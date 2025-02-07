import React from 'react';
import { Avatar, Box, Typography, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface NotificationCardProps {
    imageUrl: string;
    message: string;
    time: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ imageUrl, message, time }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                padding: 2,
                borderBottom: '1px solid #eee',
                backgroundColor: '#f8f8f8',
            }}
        >

            <Avatar src={imageUrl} alt="User Avatar" sx={{ marginRight: 1 }} />

            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>
                    {message}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {time}
                </Typography>
            </Box>

            <IconButton aria-label="more options" sx={{ marginLeft: 'auto' }}> {/* Push button to the right */}
                <MoreVertIcon />
            </IconButton>
        </Box>
    );
};

export default NotificationCard;
