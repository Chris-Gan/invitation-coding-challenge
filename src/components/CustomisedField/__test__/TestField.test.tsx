/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { Form, Formik } from 'formik';
import { I18nextProvider } from 'react-i18next';
import { Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomisedTextField from '../TextField';
import i18n from '../../../i18n/i18n';

const MockedCustomisedTextField = () => {
    return (
        <I18nextProvider i18n={i18n}>
            <Formik initialValues={{ testField: '' }} onSubmit={jest.fn()}>
                <Form>
                    <CustomisedTextField fieldName="testField" inputLabel="ABC Label" />
                </Form>
            </Formik>
        </I18nextProvider>
    );
};
const MockedDisabledPastingCustomisedTextField = () => {
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const toggleSnackbar = () => {
        setIsSnackbarOpen((prev) => !prev);
    };
    const handleSnackbarClose = () => {
        setIsSnackbarOpen(false);
    };
    return (
        <I18nextProvider i18n={i18n}>
            <Formik initialValues={{ testField: '' }} onSubmit={jest.fn()}>
                <Form>
                    <CustomisedTextField
                        fieldName="testField"
                        inputLabel="ABC Label"
                        disableCopyPaste={{ isSnackBarOpen: isSnackbarOpen, setSnackbarMessage, toggleSnackbar }}
                    />
                </Form>
            </Formik>
            <Snackbar
                open={isSnackbarOpen}
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
        </I18nextProvider>
    );
};

describe('<CustomisedTextField />', () => {
    it('renders an input field', () => {
        const { getByRole } = render(<MockedCustomisedTextField />);
        const inputComponent = getByRole('textbox');
        expect(inputComponent).toBeInTheDocument();
    });
    it('renders the correct label', () => {
        const { getByLabelText } = render(<MockedCustomisedTextField />);
        const labelComponent = getByLabelText('ABC Label');
        expect(labelComponent).toBeInTheDocument();
    });

    it('renders an input field which is initially empty', () => {
        const { getByRole } = render(<MockedCustomisedTextField />);
        const inputComponent = getByRole('textbox');

        expect(inputComponent).toHaveDisplayValue('');
    });
    it('prevents pasting to the input field when disableCopyPaste prop is filled', () => {
        const { getByRole } = render(<MockedDisabledPastingCustomisedTextField />);
        const inputComponent = getByRole('textbox');

        // try to paste something
        fireEvent.paste(inputComponent, { clipboardData: { getData: () => 'pasted data' } });

        // pasting fails because the value is still empty
        expect(inputComponent).not.toHaveValue();
    });

    it('shows snackbar when pasting is attempted in field that has disabled pasting ', async () => {
        const { getByRole, findByText } = render(<MockedDisabledPastingCustomisedTextField />);
        const inputComponent = getByRole('textbox');

        // try to paste something
        fireEvent.paste(inputComponent, { clipboardData: { getData: () => 'pasted data' } });

        expect(await findByText('Pasting is disabled for this field')).toBeInTheDocument();
    });
});
