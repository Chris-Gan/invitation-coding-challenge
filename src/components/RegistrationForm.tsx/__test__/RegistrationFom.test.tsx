import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Formik } from 'formik';
import { RegistrationFormInterface } from 'interfaces/form';
import { I18nextProvider } from 'react-i18next';
import RegistrationForm from '../RegistrationForm';
import i18n from '../../../i18n/i18n';

type Props = { initialValues?: RegistrationFormInterface };
const handleDialogOpen = jest.fn();
const snackbarControls = {
    isSnackBarOpen: false,
    setSnackbarMessage: jest.fn(),
    toggleSnackbar: jest.fn(),
};
const MockedRegistrationForm = ({ initialValues }: Props) => {
    return (
        <I18nextProvider i18n={i18n}>
            <Formik initialValues={initialValues ?? {}} onSubmit={jest.fn()}>
                <RegistrationForm isOpened handleDialogOpen={handleDialogOpen} snackbarControls={snackbarControls} />
            </Formik>
        </I18nextProvider>
    );
};
describe('<RegistrationForm />', () => {
    it('should open dialog when isOpened is true', () => {
        const { queryByRole } = render(<MockedRegistrationForm />);
        const dialog = queryByRole('dialog');
        expect(dialog).toBeInTheDocument();
    });

    it('should close dialog when close button is clicked', async () => {
        const { getByRole } = render(<MockedRegistrationForm />);
        const closeButton = getByRole('button', { name: 'close' });
        fireEvent.click(closeButton);
        await waitFor(() => {
            expect(handleDialogOpen).toBeCalledWith(false);
        });
    });

    it('should disable submit button when form is not valid, not dirty, or is submitting', () => {
        const { getByRole } = render(<MockedRegistrationForm />);
        const submitButton = getByRole('button', { name: 'Submit' });
        expect(submitButton).toBeDisabled();
    });
    it('should render CustomisedInputField components', () => {
        const { getByRole } = render(<MockedRegistrationForm initialValues={{ fullName: '', email: '', confirmEmail: '', rememberMe: false }} />);
        const fullNameField = getByRole('textbox', { name: 'Full Name' });
        const emailField = getByRole('textbox', { name: 'Email' });
        const confirmEmailField = getByRole('textbox', { name: 'Confirm Email' });

        expect(fullNameField).toBeInTheDocument();
        expect(emailField).toBeInTheDocument();
        expect(confirmEmailField).toBeInTheDocument();
    });
});
