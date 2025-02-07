import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const SheetCard: React.FC = () => {

    return (
        <Card sx={{ maxWidth: 345, minWidth: 280 }}>
            <CardMedia
                sx={{ height: 140 }}
                image="./images/Cards/code1.jpg"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                   I am The Here
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    System Hang
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Created At : {Date.now().toString()}
                </Typography>
            </CardContent>
            <CardActions>
                <Button> Request Interview </Button>
            </CardActions>
        </Card>
    );
};

export default SheetCard;