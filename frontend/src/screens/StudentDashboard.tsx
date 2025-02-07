import React, {useEffect, useState} from 'react';
import {Typography, Box, Button, TextField, Container} from '@mui/material';

const StudentDashboard: React.FC = () => {

    const imageURLs = [
        "https://files.iamvector.com/assets/img/about-img.svg",
        "https://www.gstatic.com/meet/user_edu_safety_light_e04a2bbb449524ef7e49ea36d5f25b65.svg",
        "https://images.pexels.com/photos/6953843/pexels-photo-6953843.jpeg",


    ];

    const [image, setImage] = useState<number>(0);

    useEffect(() => {

       const intervals=setTimeout(() => {

           setImage((image + 1) % 3);
       },10000);

        return () => {
            clearTimeout(intervals);
        }
    }, [image]);
    return (
        <Container className="flex">
            <Box sx={{display: 'flex',justifyContent:'center',alignItems:'center',flexDirection: {xs: 'column', md: 'row'}, gap: 5, py: 4}}>
                <Box sx={{width: '50%'}}>
                    <Typography variant="h3" className="font-PassionOne capitalize font-extrabold" gutterBottom>
                        One Click Interview
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Connect, collaborate with experts from anywhere with Google Meet
                    </Typography>
                    <Box sx={{display: 'flex', gap: 2, flexDirection: {xs: 'column'}}}>
                        <TextField
                            variant="outlined"
                            placeholder="Enter a code of Interviewer "
                            size="small"
                            sx={{flexGrow: 1}}
                        />
                        <Button variant="text" color="primary">Join</Button>
                    </Box>

                </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            overflowX: 'auto',
                            minHeight: '400px',
                        }}
                    >
                       <img  src={imageURLs[image]} className="w-96 h-96 rounded-full bg-contain transition-all" alt="copied"/>
                    </Box>



            </Box>

        </Container>
    );
};

export default StudentDashboard;