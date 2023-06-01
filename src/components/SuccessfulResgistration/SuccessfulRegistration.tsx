import React from 'react';
import { Dialog, DialogTitle, Typography, IconButton, DialogContent, Divider, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

type Props = {
    isOpened: boolean;
    handleDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const SuccessfulRegistration = ({ isOpened, handleDialogOpen }: Props) => {
    const { t } = useTranslation();
    const handleClose = () => {
        handleDialogOpen(false);
    };
    return (
        <Dialog data-testid="successfulRegistrationDialog" open={isOpened} onClose={handleClose}>
            <DialogTitle>
                <Typography sx={{ fontSize: '24px' }} fontWeight={700}>
                    {' '}
                    {t('successfulRegistrationHeader')}
                </Typography>
                <IconButton
                    size="large"
                    aria-label="close"
                    color="inherit"
                    sx={{
                        position: 'absolute',
                        right: 15,
                        top: 10,
                    }}
                    onClick={() => handleDialogOpen(false)}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Divider />
                <Typography variant="body1" sx={{ my: 2 }}>
                    {t('successfulRegistrationDescription')}
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" onClick={handleClose}>
                        {t('closeButtonLabel')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SuccessfulRegistration;
