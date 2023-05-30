import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Form, Formik } from 'formik';
import { I18nextProvider } from 'react-i18next';
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
});
