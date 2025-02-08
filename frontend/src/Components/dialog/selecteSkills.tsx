import React from 'react'
import {
    Avatar,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Typography,
    Stack,
    Box,
    IconButton,
    Chip,
    Paper,
    Button,
    DialogActions
} from '@mui/material'
import {useSnackbar} from "notistack";
import { LoadingButton } from '@mui/lab'
import {styled} from '@mui/material/styles';
import { Save, People } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add';
import {rawskills} from "./rawSkills.ts";
import axiosInstance from "../../utils/axiosInstance.ts";
import {useUserStore} from "../../store/User.store.ts";
import {useNavigate} from "react-router-dom";

interface SetDetailsDialogProps {
    dialogState: boolean
    setDialogState: React.Dispatch<React.SetStateAction<boolean>>
}
const ListItem = styled('li')(({theme}) => ({
    margin: theme.spacing(0.5),
}));

const SelectSkills: React.FC<SetDetailsDialogProps> = ({ dialogState, setDialogState }) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [totalSkills, setTotalSkills] = React.useState<string[]>([]);
    const [showFullSkills, setShowFullSkills] = React.useState<string[]>(rawskills);
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const user = useUserStore(state=>state.user);
    const navigate = useNavigate();


    const handleClose = () => {
        setDialogState(false);
        setTotalSkills([]);
        setShowFullSkills(rawskills);
        setErrorMessage('');
        setIsLoading(false);
    }

    const {enqueueSnackbar} = useSnackbar();

    const handleStart = async () => {
        setIsLoading(true);
         try {
             const res = await axiosInstance.post("/candidate/start-interview", {userId: user?.id, skills: totalSkills});
             console.log(res);
             navigate('/home/interview');
             handleClose();

         }catch (error) {
             console.log(error);
             enqueueSnackbar('Cannot Start Interview Write Now', {variant: 'error',autoHideDuration: 3000});
             handleClose();

         }
    }



    const addSkill = (value:string) => {
          if(totalSkills.length>=5){
                setErrorMessage('You can select atmost 5 skills');
                return;
          }else{
                setErrorMessage('');
          }
          setIsLoading(true);
            setTotalSkills([...totalSkills,value]);
            const newArray= showFullSkills.filter((skill)=>skill!==value);
            setShowFullSkills(newArray);
            setIsLoading(false);
    }
    const removeSkill = (value:string) => {
        setIsLoading(true);
         const newArray=totalSkills.filter((skill)=>skill!==value);
         setTotalSkills(newArray);
         setShowFullSkills([...showFullSkills,value]);
         setIsLoading(false);
    }



    return (
        <Dialog
            fullWidth
            maxWidth='sm'
            open={dialogState}
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: 4,
                    overflow: 'hidden',
                },
            }}
            onClose={() => {
                setDialogState(false)
            }}>
            {/* Accent Bar */}
            <Box height={6} bgcolor='primary.main' />

            <DialogTitle>
                <Stack direction='column' alignItems='center' spacing={2}>
                    <Box sx={{ display: 'flex', width: '100%' }} alignItems={'center'} gap={2}>
                        <Avatar sx={{ bgcolor: 'primary.main', color: 'white' }}>
                            <People />
                        </Avatar>
                        <Typography variant='h5' fontWeight='bold'>
                            Select Skills for Interview
                        </Typography>
                    </Box>
                </Stack>
            </DialogTitle>
            <Divider />
            {totalSkills.length!=0?<DialogContent>
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
                {totalSkills.map((data) => {

                    return (
                        <ListItem key={data}>
                            <Chip
                                label={data}
                                onDelete={()=>{removeSkill(data)}}
                            />
                        </ListItem>
                    );
                })}
                </Paper>
                <Typography
                    variant='body2'
                    fontWeight='light'
                    color={'gray'}
                    textAlign={'center'}>
                    {errorMessage ?? ''}
                </Typography>
            </DialogContent>:''}

            <DialogContent
                sx={{
                    height: '50vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    alignItems: 'center',
                    padding: '0px',
                }}>
                {isLoading ? (
                    <Typography variant="h3" > No Skill Matched </Typography>
                ) : (
                     showFullSkills.map((skill) => (
                         <>
                         <Box
                             sx={{
                                 'width': '100%',
                                 'display': 'flex',
                                 'alignItems': 'center',
                                 'justifyContent': 'start',
                                 'gap': 2,
                                 'backgroundColor': '#F1F6FF',
                                 'paddingLeft': '16px',
                                 'paddingRight': '24px',
                                 'paddingTop': '8px',
                                 'paddingBottom': '8px',
                                 '&:hover': {
                                     backgroundColor: '#ebf1ff',
                                 },
                             }}>
                             <Avatar
                                 src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                                 sx={{ bgcolor: 'primary.main', color: 'white' }}></Avatar>
                             <Box>
                                 <Typography variant='h6' fontWeight='medium'>
                                        {skill}
                                 </Typography>
                             </Box>
                             <div className={'flex-1'} />
                             <IconButton onClick={()=>{addSkill(skill)}}>
                                 <AddIcon className={'text-[#1D2C48]'} />
                             </IconButton>
                         </Box>
                    <Divider />
                         </>
                    ))
                )}
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button
                    onClick={handleClose}
                    variant='outlined'
                    color='error'>
                    Cancel
                </Button>
                <LoadingButton
                    onClick={handleStart}
                    loading={isLoading}
                    loadingPosition='start'
                    startIcon={<Save />}
                    variant='contained'
                    color='primary'>
                    Start
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default SelectSkills