import { Box, Button, Typography } from '@mui/material';
import RegistrationForm from 'components/RegistrationForm.tsx';
import { registrationFormInitialValues } from 'constant/form';
import { FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

const MainPage = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

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
    const formik = useFormik({
        initialValues: registrationFormInitialValues,
        validateOnMount: true,
        validationSchema,
        onSubmit: (values) => {
            console.log({ values });
        },
    });

    const toggleFormDialog = () => {
        setOpen((prev) => !prev);
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
                <RegistrationForm isOpened={open} handleDialogOpen={setOpen} />
            </FormikProvider>
        </>
    );
};

export default MainPage;
