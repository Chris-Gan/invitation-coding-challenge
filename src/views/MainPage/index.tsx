import CloseIcon from '@mui/icons-material/Close';
import { Backdrop, Box, Button, CircularProgress, IconButton, Snackbar, Typography } from '@mui/material';
import RegistrationForm from 'components/RegistrationForm.tsx';
import SuccessfulRegistration from 'components/SuccessfulResgistration';
import { registrationFormInitialValues } from 'constant/form';
import { FormikHelpers, FormikProvider, useFormik } from 'formik';
import { RegistrationFormInterface } from 'interfaces/form';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { postInvitationRegistration } from 'services/backendServices';
import * as Yup from 'yup';

const MainPage = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [successfulDialogOpen, setSuccessfulDialogOpen] = useState(false);

    const initialFormValues = useMemo(() => {
        const storedUser = localStorage.getItem('users');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser) {
                return {
                    ...registrationFormInitialValues,
                    fullName: parsedUser.name,
                    email: parsedUser.email,
                    rememberMe: !!parsedUser,
                };
            }
        }
        return registrationFormInitialValues;
    }, [formDialogOpen]);

    const validationSchema = Yup.object().shape({
        fullName: Yup.string()
            .min(3, t('minThreeCharacters') as string)
            .required(t('requiredField') as string),
        email: Yup.string()
            .email(t('invalidEmail') as string)
            .required(t('requiredField') as string),
        confirmEmail: Yup.string()
            .oneOf([Yup.ref('email'), undefined], t('mismatchEmail') as string)
            .required(t('requiredField') as string),
        rememberMe: Yup.boolean(),
    });

    const handleOnSubmit = async (values: RegistrationFormInterface, { resetForm }: FormikHelpers<RegistrationFormInterface>) => {
        setLoading(true);
        try {
            await postInvitationRegistration(values);

            if (!values.rememberMe) {
                localStorage.removeItem('users');
            }

            resetForm();
            setLoading(false);
            setFormDialogOpen(false);
            setSuccessfulDialogOpen(true);
        } catch (error: any) {
            setLoading(false);
            setSnackbarOpen(true);
            setSnackbarMessage(error.response.data.errorMessage);
        }
    };
    const formik = useFormik({
        initialValues: initialFormValues,
        validateOnMount: true,
        enableReinitialize: true,
        validationSchema,
        onSubmit: handleOnSubmit,
    });

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const toggleSnackbar = () => {
        setSnackbarOpen((prev) => !prev);
    };
    const toggleFormDialog = () => {
        setFormDialogOpen((prev) => !prev);
    };

    return (
        <>
            <Box
                display="flex"
                sx={{ justifyContent: 'flex-start', alignItems: 'center', pt: '20vh', textAlign: 'center', backgroundColor: 'warning' }}
                flexDirection="column"
            >
                <Typography variant="h3" sx={{ fontWeight: '900', mt: 3.5, mb: 2.5 }}>
                    {t('mainPageHeader')}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: '800', mb: 5.5 }}>
                    {t('mainPageSubheader')}
                </Typography>
                <Button color="primary" variant="contained" onClick={toggleFormDialog} sx={{ minHeight: '50px', minWidth: '300px', fontWeight: 900 }}>
                    {t('inviteButtonLabel')}
                </Button>
            </Box>
            <FormikProvider value={formik}>
                <RegistrationForm
                    isOpened={formDialogOpen}
                    handleDialogOpen={setFormDialogOpen}
                    snackbarControls={{ isSnackBarOpen: snackbarOpen, setSnackbarMessage, toggleSnackbar }}
                />
                <Backdrop open={loading} sx={{ zIndex: 1500 }}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </FormikProvider>

            <SuccessfulRegistration isOpened={successfulDialogOpen} handleDialogOpen={setSuccessfulDialogOpen} />
            <Snackbar
                open={snackbarOpen}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                message={snackbarMessage}
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            />
        </>
    );
};

export default MainPage;
