import React, {useEffect, useState} from 'react';
import {Typography, Box, Container,Button} from '@mui/material';
import {styled} from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import SelectSkills from "../Components/dialog/selecteSkills.tsx";


const ListItem = styled('li')(({theme}) => ({
    margin: theme.spacing(0.5),
}));
interface ChipsArrayProps {
    chipData: string[]
    setChipData: React.Dispatch<React.SetStateAction<string[]>>;
}

const ChipsArray:React.FC<ChipsArrayProps>=({chipData,setChipData})=> {


    const handleDelete = (index:number) => () => {
          const newArray=chipData.filter((_,i)=>i!==index);
            setChipData(newArray);
    };

    return (
        <Paper
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 0,
            }}
            component="ul"
        >
            {chipData.map((data,index) => {

                return (
                    <ListItem key={data}>
                        <Chip
                            label={data}
                            onDelete={handleDelete(index)}
                        />
                    </ListItem>
                );
            })}
        </Paper>
    );
}


const StudentDashboard: React.FC = () => {

    const imageURLs = [
        "https://files.iamvector.com/assets/img/about-img.svg",
        "https://www.gstatic.com/meet/user_edu_safety_light_e04a2bbb449524ef7e49ea36d5f25b65.svg",
        "https://images.pexels.com/photos/6953843/pexels-photo-6953843.jpeg",
    ];


    const [image, setImage] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);

    const [skills, setSkills] = useState<string[]>([]);


    useEffect(() => {

        const intervals = setTimeout(() => {

            setImage((image + 1) % 3);
        }, 10000);

        return () => {
            clearTimeout(intervals);
        }
    }, [image]);

    return (
        <>
        <Container className="flex">
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: {xs: 'column', md: 'row'},
                gap: 5,
                py: 4
            }}>
                <Box sx={{width: '50%'}} className={'flex flex-col'}>
                    <Typography variant="h3" className="font-PassionOne capitalize font-extrabold" gutterBottom>
                        One Click Interview
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Connect, collaborate with experts from anywhere with Google Meet
                    </Typography>

                    <ChipsArray chipData={skills} setChipData={setSkills}/>

                    <Button variant="contained" color="primary" onClick={()=>{setOpen(true)}}>Join</Button>

                    <Paper
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0.5,
                            m: 0,
                        }}
                        component="div"
                    >


                    </Paper>




                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        minHeight: '400px',
                    }}
                >
                    <img src={imageURLs[image]} className="w-96 h-96 rounded-full bg-contain transition-all"
                         alt="copied"/>
                </Box>


            </Box>

        </Container>
        <SelectSkills dialogState={open} setDialogState={setOpen}/>
        </>
    );
};

export default StudentDashboard;