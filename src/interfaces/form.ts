import { SxProps } from '@mui/material';

export interface RegistrationForm {
    fullName: string;
    email: string;
    confirmEmail: string;
    rememberMe: boolean;
}

export interface DisableCopyPaste {
    isSnackBarOpen: boolean;
    setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>;
    handleCopyPaste: () => void;
}

export interface InputFieldProps {
    fieldName: string;
    inputLabel: string;
    fieldStyle?: SxProps;
    disableCopyPaste?: DisableCopyPaste;
}
