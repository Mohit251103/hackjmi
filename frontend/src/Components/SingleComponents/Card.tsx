import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import {Interview} from "../NotificationRoute/Interview.tsx";


const  BottomActionsCard=({data}:{data:Interview})=> {
    return (
        <Card
            variant="outlined"
            sx={{

                overflow: 'auto',
                resize: 'horizontal',
                display:'flex'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding:'20px',
                }}
            >
                <Avatar src="/static/images/avatar/1.jpg" />
            </Box>
            <CardContent>
                <Typography variant="h3"> {data.name}</Typography>
                <Typography variant="body1">
                    {data.name}
                </Typography>
            </CardContent>
            <CardActions sx={{flex:'1'}}>
                <IconButton color="primary" sx={{ mr: 'auto' }}>
                    <FavoriteBorder />
                </IconButton>
                <Button variant="outlined" color="primary">
                    {data.status}
                </Button>
                <Button variant="contained" color="primary">
                    Join
                </Button>
            </CardActions>
        </Card>
    );
}
export default BottomActionsCard;