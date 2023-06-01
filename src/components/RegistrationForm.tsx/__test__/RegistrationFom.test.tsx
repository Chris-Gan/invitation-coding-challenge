import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Formik } from 'formik';
import { RegistrationFormInterface } from 'interfaces/form';
import { I18nextProvider } from 'react-i18next';
import * as Yup from 'yup';
import RegistrationForm from '../RegistrationForm';
import i18n from '../../../i18n/i18n';

type Props = { initialValues?: RegistrationFormInterface; validationSchema?: any };
const handleDialogOpen = jest.fn();
const snackbarControls = {
    isSnackBarOpen: false,
    setSnackbarMessage: jest.fn(),
    toggleSnackbar: jest.fn(),
};
const personalValidationSchema = Yup.object().shape({
    fullName: Yup.string().min(3, 'minThreeCharacters').required('requiredField'),
    email: Yup.string().email('invalidEmail').required('requiredField'),
    confirmEmail: Yup.string()
        .oneOf([Yup.ref('email'), undefined], 'mismatchEmail')
        .required('requiredField'),
    rememberMe: Yup.boolean(),
});
const MockedRegistrationForm = ({ initialValues, validationSchema }: Props) => {
    return (
        <I18nextProvider i18n={i18n}>
            <Formik initialValues={initialValues ?? {}} onSubmit={jest.fn()} validationSchema={validationSchema}>
                <RegistrationForm isOpened handleDialogOpen={handleDialogOpen} snackbarControls={snackbarControls} />
            </Formik>
        </I18nextProvider>
    );
};
describe('<RegistrationForm />', () => {
    describe('contains components include', () => {
        it('form header', () => {
            const { getByTestId } = render(<MockedRegistrationForm />);
            const formHeader = getByTestId('registrationFormHeader');

            expect(formHeader).toBeInTheDocument();
        });
        it('close button', () => {
            const { getByRole } = render(<MockedRegistrationForm />);
            const closeButton = getByRole('button', { name: 'close' });

            expect(closeButton).toBeInTheDocument();
        });
        it('full name field input', () => {
            const { getByRole } = render(<MockedRegistrationForm initialValues={{ fullName: '', email: '', confirmEmail: '', rememberMe: false }} />);
            const fullNameField = getByRole('textbox', { name: 'Full Name' });

            expect(fullNameField).toBeInTheDocument();
        });
        it('email field input', () => {
            const { getByRole } = render(<MockedRegistrationForm initialValues={{ fullName: '', email: '', confirmEmail: '', rememberMe: false }} />);

            const emailField = getByRole('textbox', { name: 'Email' });

            expect(emailField).toBeInTheDocument();
        });
        it('confirm email field input', () => {
            const { getByRole } = render(<MockedRegistrationForm initialValues={{ fullName: '', email: '', confirmEmail: '', rememberMe: false }} />);
            const confirmEmailField = getByRole('textbox', { name: 'Confirm Email' });
            expect(confirmEmailField).toBeInTheDocument();
        });
        it('remember me checkbox', () => {
            const { getByRole } = render(<MockedRegistrationForm initialValues={{ fullName: '', email: '', confirmEmail: '', rememberMe: false }} />);
            const checkboxField = getByRole('checkbox');
            expect(checkboxField).toBeInTheDocument();
        });
        it('a submit button', () => {
            const { getByTestId } = render(
                <MockedRegistrationForm initialValues={{ fullName: '', email: '', confirmEmail: '', rememberMe: false }} />
            );
            const submitButton = getByTestId('registrationFormSubmitBtn');
            expect(submitButton).toBeInTheDocument();
        });
    });

    describe('contains interactions include', () => {
        it('open dialog when isOpened is true', () => {
            const { queryByRole } = render(<MockedRegistrationForm />);
            const dialog = queryByRole('dialog');
            expect(dialog).toBeInTheDocument();
        });

        it('close dialog when close button is clicked', async () => {
            const { getByRole } = render(<MockedRegistrationForm />);
            const closeButton = getByRole('button', { name: 'close' });
            fireEvent.click(closeButton);
            await waitFor(() => {
                expect(handleDialogOpen).toBeCalledWith(false);
            });
        });
        it('remember me checkbox is checked when the initialValue of rememberMe is true', () => {
            const { getByRole } = render(<MockedRegistrationForm initialValues={{ fullName: '', email: '', confirmEmail: '', rememberMe: true }} />);
            const checkbox = getByRole('checkbox');
            expect(checkbox).toBeChecked();
        });
        it('remember me checkbox is unchecked when the initialValue of rememberMe is false', () => {
            const { getByRole } = render(<MockedRegistrationForm initialValues={{ fullName: '', email: '', confirmEmail: '', rememberMe: false }} />);
            const checkbox = getByRole('checkbox');
            expect(checkbox).not.toBeChecked();
        });
        it('checked remember me checkbox is unchecked when being clicked', async () => {
            const { getByRole } = render(<MockedRegistrationForm initialValues={{ fullName: '', email: '', confirmEmail: '', rememberMe: false }} />);
            const checkbox = getByRole('checkbox');
            await act(async () => {
                fireEvent.click(checkbox);
                expect(checkbox).toBeChecked();
            });
        });
        it('unchecked remember me checkbox is checked when being clicked', async () => {
            const { getByRole } = render(<MockedRegistrationForm initialValues={{ fullName: '', email: '', confirmEmail: '', rememberMe: true }} />);
            const checkbox = getByRole('checkbox');
            await act(async () => {
                fireEvent.click(checkbox);
                expect(checkbox).not.toBeChecked();
            });
        });

        it('displays error message when invalid full name is entered', async () => {
            const { getByRole, findByText } = render(
                <MockedRegistrationForm
                    initialValues={{ fullName: '', email: '', confirmEmail: '', rememberMe: false }}
                    validationSchema={personalValidationSchema}
                />
            );

            const fullNameField = getByRole('textbox', { name: 'Full Name' });

            // change the field value to have less than 3 characters
            fireEvent.change(fullNameField, { target: { value: 'Te' } });

            // remove the focus from the field
            fireEvent.blur(fullNameField);

            expect(await findByText('minThreeCharacters')).toBeInTheDocument();
        });

        it('displays error message when invalid email is entered', async () => {
            const { getByRole, findByText } = render(
                <MockedRegistrationForm
                    initialValues={{ fullName: '', email: '', confirmEmail: '', rememberMe: false }}
                    validationSchema={personalValidationSchema}
                />
            );
            const emailField = getByRole('textbox', { name: 'Email' });

            fireEvent.change(emailField, { target: { value: 'invalid_email' } });

            // remove the focus from the field
            fireEvent.blur(emailField);
            const errorMessage = await findByText('invalidEmail');
            expect(errorMessage).toBeInTheDocument();
        });

        it('displays error message when email and confirm email do not match', async () => {
            const { getByRole, findByText } = render(
                <MockedRegistrationForm
                    initialValues={{ fullName: '', email: '', confirmEmail: '', rememberMe: false }}
                    validationSchema={personalValidationSchema}
                />
            );
            const emailField = getByRole('textbox', { name: 'Email' });
            const confirmEmailField = getByRole('textbox', { name: 'Confirm Email' });

            fireEvent.change(emailField, { target: { value: 'test@example.com' } });
            // remove the focus from the field
            fireEvent.blur(emailField);
            fireEvent.change(confirmEmailField, { target: { value: 'mismatch@example.com' } });
            // remove the focus from the field
            fireEvent.blur(confirmEmailField);
            const errorMessage = await findByText('mismatchEmail');
            expect(errorMessage).toBeInTheDocument();
        });
        it('disable submit button when form is not valid, not dirty, or is submitting', () => {
            const { getByRole } = render(<MockedRegistrationForm />);
            const submitButton = getByRole('button', { name: 'Submit' });
            expect(submitButton).toBeDisabled();
        });
    });
});
