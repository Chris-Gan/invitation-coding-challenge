import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, Snackbar, Typography } from '@mui/material';
import CustomisedCheckbox from 'components/CustomisedField/Checkbox';
import CustomisedInputField from 'components/CustomisedField/TextField';
import { Form, useFormikContext } from 'formik';
import { DisableCopyPaste } from 'interfaces/form';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
    isOpened: boolean;
    handleDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const RegistrationForm = ({ isOpened, handleDialogOpen }: Props) => {
    const { t } = useTranslation();
    const { isValid } = useFormikContext();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleClose = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>, action: 'backdropClick' | 'escapeKeyDown') => {
        if (action === 'backdropClick') return;
        handleDialogOpen(false);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const triggerSnackBar = () => {
        setSnackbarOpen((prev) => !prev);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleSubmit = () => {
        // Simulating async request
        // setTimeout(() => {
        //     setSnackbarMessage('Form submitted successfully!');
        //     setSnackbarOpen(true);
        //     handleClose();
        // }, 500);
    };
    return (
        <>
            <Dialog open={isOpened} onClose={handleClose}>
                <DialogTitle>
                    <Typography variant="h5" fontWeight={700}>
                        {' '}
                        {t('formHeader')}
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
                    <Form>
                        <CustomisedInputField fieldName="fullName" inputLabel={t('fullNameFieldLabel')} fieldStyle={{ my: { xs: 2, md: 2 } }} />
                        <CustomisedInputField fieldName="email" inputLabel={t('emailFieldLabel')} fieldStyle={{ mb: { xs: 2, md: 2 } }} />
                        <CustomisedInputField
                            fieldName="confirmEmail"
                            inputLabel={t('confirmEmailFieldLabel')}
                            disableCopyPaste={
                                {
                                    isSnackBarOpen: snackbarOpen,
                                    setSnackbarMessage,
                                    handleCopyPaste: triggerSnackBar,
                                } as DisableCopyPaste
                            }
                        />
                        <CustomisedCheckbox fieldName="rememberMe" inputLabel={t('rememberMeCheckboxLabel')} fieldStyle={{ mb: 1, ml: 0.5 }} />
                        <Button sx={{ mt: 2 }} disabled={!isValid} fullWidth variant="contained" type="submit">
                            {t('submitButtonLabel')}
                        </Button>
                    </Form>
                </DialogContent>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                message={snackbarMessage}
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
            />
        </>
    );
};

export default RegistrationForm;
