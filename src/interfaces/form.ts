import { SxProps } from '@mui/material';

export interface RegistrationFormInterface {
    fullName: string;
    email: string;
    confirmEmail: string;
    rememberMe: boolean;
}

export interface SnackbarControlsInterface {
    isSnackBarOpen: boolean;
    setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>;
    toggleSnackbar: () => void;
}

export interface InputFieldProps {
    fieldName: string;
    inputLabel: string;
    disableAutocomplete?: boolean;
    fieldStyle?: SxProps;
    disableCopyPaste?: SnackbarControlsInterface;
}
