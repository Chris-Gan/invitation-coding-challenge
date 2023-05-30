import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';
import { InputFieldProps } from 'interfaces/form';
import { useTranslation } from 'react-i18next';

const CustomisedInputField = ({ fieldName, inputLabel, fieldStyle = {}, disableAutocomplete, disableCopyPaste }: InputFieldProps) => {
    const { t } = useTranslation();
    const [field, meta] = useField(fieldName);
    const { setSnackbarMessage, toggleSnackbar } = disableCopyPaste ?? {};

    const preventPasting = (e: React.ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (toggleSnackbar && setSnackbarMessage) {
            toggleSnackbar();
            setSnackbarMessage(t('pastingNotAllowed') as string);
        }
    };
    return (
        <TextField
            {...field}
            autoComplete={disableAutocomplete ? 'new-password' : undefined}
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            onPaste={preventPasting}
            sx={fieldStyle}
            name={fieldName}
            label={inputLabel}
            fullWidth
        />
    );
};

export default CustomisedInputField;
