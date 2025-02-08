import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Typography,
    Stack,
    Button,
    DialogActions
} from '@mui/material'
import {useSnackbar} from "notistack";
import { Save} from '@mui/icons-material'

interface SetDetailsDialogProps {
    dialogState: boolean
    setDialogState: React.Dispatch<React.SetStateAction<boolean>>,
    link: string
}


const MeetingLinkDialog: React.FC<SetDetailsDialogProps> = ({ dialogState, setDialogState,link }) => {
    const {enqueueSnackbar} = useSnackbar();

    const handleCopy = () => {
        navigator.clipboard.writeText(link).then(() => {
            enqueueSnackbar('Link Copied', {variant: 'success',autoHideDuration: 3000});
            setDialogState(false);
        }).catch(err => {
            console.error("Failed to copy: ", err);
            enqueueSnackbar('Failed to copy link', {variant: 'error',autoHideDuration: 3000});
            setDialogState(false);
        });
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

            <DialogTitle>
                <Stack direction='column' alignItems='center' spacing={2}>

                        <Typography variant='h5' fontWeight='bold'>
                            Generated Meeting Link
                        </Typography>
                </Stack>
            </DialogTitle>
            <Divider />

            <DialogContent>


                <Typography variant="h4" className="text-gray-700 text-center mb-8">
                    {link}
                </Typography>


            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button
                    onClick={()=>{setDialogState(false)}}
                    variant='outlined'
                    color='error'>
                    Cancel
                </Button>
                <Button
                    onClick={handleCopy}
                    startIcon={<Save />}
                    variant='contained'
                    color='primary'>
                    Copy Link
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default MeetingLinkDialog;