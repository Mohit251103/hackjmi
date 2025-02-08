import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <Box className="h-screen w-screen overflow-hidden flex flex-col items-center justify-center bg-gray-100"> {/* Added background color */}
            <Box className="relative"> {/* Container for image and 404 text */}
                <img
                    src="https://res.cloudinary.com/dmrtl2bh1/image/upload/v1739027801/MockMate.png"
                    alt="404"
                    className="w-64 h-auto" // Adjust size as needed
                />
            </Box>
            <Typography variant="h4" className="text-gray-700 text-center mb-8">
                Oops! Something went wrong. <br /> Page Not Found
            </Typography>
            <Button component={Link} to="/home" variant="contained" color="primary" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Go Home
            </Button>
        </Box>
    );
};

export default NotFound;