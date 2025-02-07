
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading=()=>{
    return (
        <Box className="w-full h-full flex items-center justify-center min-h-screen overflow-hidden">
            <CircularProgress size={52} />
        </Box>
    )
}

export default Loading;
