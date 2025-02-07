import React, {useEffect, useState} from 'react';
import {Typography, Box, Container,Button} from '@mui/material';
import {styled} from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';

interface ChipData {
    key: number;
    label: string;
}

const ListItem = styled('li')(({theme}) => ({
    margin: theme.spacing(0.5),
}));
interface ChipsArrayProps {
    chipData: ChipData[];
    setChipData: React.Dispatch<React.SetStateAction<ChipData[]>>;
}

const ChipsArray:React.FC<ChipsArrayProps>=({chipData,setChipData})=> {


    const handleDelete = (chipToDelete: ChipData) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
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
            {chipData.map((data) => {

                return (
                    <ListItem key={data.key}>
                        <Chip
                            label={data.label}
                            onDelete={handleDelete(data)}
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
    const rawskills = [
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
        { key: 2, label: 'Polymer' },
        { key: 3, label: 'React' },
        { key: 4, label: 'Vue.js' },
        { key: 5, label: 'Svelte' },
        { key: 6, label: 'Next.js' },
        { key: 7, label: 'Nuxt.js' },
        { key: 8, label: 'Redux' },
        { key: 9, label: 'Zustand' },
        { key: 10, label: 'TypeScript' },
        { key: 11, label: 'Node.js' },
        { key: 12, label: 'Express.js' },
        { key: 13, label: 'NestJS' },
        { key: 14, label: 'GraphQL' },
        { key: 15, label: 'REST API' },
        { key: 16, label: 'MongoDB' },
        { key: 17, label: 'PostgreSQL' },
        { key: 18, label: 'Firebase' },
        { key: 19, label: 'Supabase' },
        { key: 20, label: 'Tailwind CSS' },
        { key: 21, label: 'Bootstrap' },
        { key: 22, label: 'Material UI' },
        { key: 23, label: 'Chakra UI' },
        { key: 24, label: 'Three.js' },
        { key: 25, label: 'WebRTC' },
        { key: 26, label: 'Socket.io' },
        { key: 27, label: 'D3.js' },
        { key: 28, label: 'Electron.js' },
        { key: 29, label: 'Docker' },
        { key: 30, label: 'Kubernetes' },
        { key: 31, label: 'Terraform' },
        { key: 32, label: 'AWS' },
        { key: 33, label: 'Azure' },
        { key: 34, label: 'Google Cloud' },
        { key: 35, label: 'Python' },
        { key: 36, label: 'Django' },
        { key: 37, label: 'Flask' },
        { key: 38, label: 'FastAPI' },
        { key: 39, label: 'Machine Learning' },
        { key: 40, label: 'AI/Deep Learning' },
        { key: 41, label: 'Blockchain' },
        { key: 42, label: 'Web3.js' },
        { key: 43, label: 'Solidity' },
        { key: 44, label: 'Cybersecurity' },
        { key: 45, label: 'CI/CD' },
        { key: 46, label: 'Jenkins' },
        { key: 47, label: 'GitHub Actions' },
        { key: 48, label: 'Redux Toolkit' },
        { key: 49, label: 'Vite' }
    ];


    const [image, setImage] = useState<number>(0);

    const [skills, setSkills] = useState<ChipData[]>([]);


    useEffect(() => {

        const intervals = setTimeout(() => {

            setImage((image + 1) % 3);
        }, 10000);

        return () => {
            clearTimeout(intervals);
        }
    }, [image]);

    return (
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

                    <Button variant="contained" color="primary"  >Join</Button>

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
                        {rawskills.map((data) => {

                            return (
                                <ListItem key={data.key}>
                                    <Chip
                                        label={data.label}
                                        onClick={() => {
                                            setSkills((chips) => chips.concat(data));
                                        }}
                                    />
                                </ListItem>
                            );
                        })}

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
    );
};

export default StudentDashboard;