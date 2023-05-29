import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, Typography } from '@mui/material';
import CustomisedCheckbox from 'components/CustomisedField/Checkbox';
import CustomisedInputField from 'components/CustomisedField/TextField';
import { Form, useFormikContext } from 'formik';
import { SnackbarControlsInterface } from 'interfaces/form';
import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
    isOpened: boolean;
    handleDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    snackbarControls?: SnackbarControlsInterface;
};
const RegistrationForm = ({ isOpened, handleDialogOpen, snackbarControls }: Props) => {
    const { t } = useTranslation();
    const { isValid, isSubmitting, dirty } = useFormikContext();

    const { isSnackBarOpen, setSnackbarMessage, toggleSnackbar } = snackbarControls ?? {};

    const handleClose = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>, action: 'backdropClick' | 'escapeKeyDown') => {
        if (action === 'backdropClick') return;
        handleDialogOpen(false);
    };
    return (
        <Dialog open={isOpened} onClose={handleClose}>
            <DialogTitle>
                <Typography sx={{ fontSize: '24px' }} fontWeight={700}>
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
                        disableAutocomplete
                        disableCopyPaste={
                            {
                                isSnackBarOpen,
                                setSnackbarMessage,
                                toggleSnackbar,
                            } as SnackbarControlsInterface
                        }
                    />
                    <CustomisedCheckbox fieldName="rememberMe" inputLabel={t('rememberMeCheckboxLabel')} fieldStyle={{ mb: 1, ml: 0.5 }} />
                    <Button sx={{ mt: 2 }} disabled={!isValid || isSubmitting || !dirty} fullWidth variant="contained" type="submit">
                        {t('submitButtonLabel')}
                    </Button>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default RegistrationForm;
