import { TextField } from '@mui/material';
import { useField } from 'formik';
import { InputFieldProps } from 'interfaces/form';
import { useTranslation } from 'react-i18next';

const CustomisedInputField = ({ fieldName, inputLabel, fieldStyle = {}, disableCopyPaste }: InputFieldProps) => {
    const { t } = useTranslation();
    const [field, meta] = useField(fieldName);
    const { setSnackbarMessage, handleCopyPaste } = disableCopyPaste ?? {};

    const preventPasting = (e: React.ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (handleCopyPaste && setSnackbarMessage) {
            handleCopyPaste();
            setSnackbarMessage(t('pastingNotAllowed') as string);
        }
    };
    return (
        <TextField
            {...field}
            autoComplete="avoidAutofill"
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
