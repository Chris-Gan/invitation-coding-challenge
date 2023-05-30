import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { Formik, Form } from 'formik';
import '@testing-library/jest-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n/i18n';
import CustomisedCheckbox from '../Checkbox';

const MockedCustomisedCheckbox = () => {
    return (
        <I18nextProvider i18n={i18n}>
            <Formik initialValues={{ testField: false }} onSubmit={jest.fn()}>
                <Form>
                    <CustomisedCheckbox fieldName="testField" inputLabel="Test label" />
                </Form>
            </Formik>
        </I18nextProvider>
    );
};
describe('<CustomisedCheckbox />', () => {
    it('renders a checkbox', () => {
        const { getByRole } = render(<MockedCustomisedCheckbox />);
        const checkboxComponent = getByRole('checkbox');
        expect(checkboxComponent).toBeInTheDocument();
    });
    it('renders the correct label', () => {
        const { getByText } = render(<MockedCustomisedCheckbox />);
        const labelComponent = getByText(/Test label/i);
        expect(labelComponent).toBeInTheDocument();
    });

    it('renders a checkbox which is initially unchecked', () => {
        const { getByTestId } = render(<MockedCustomisedCheckbox />);

        // unchecked icon svg from material-ui
        const emptyCheckboxIcon = getByTestId('CheckBoxOutlineBlankIcon');
        expect(emptyCheckboxIcon).toBeInTheDocument();
    });

    it('will be checked when the checkbox is clicked', async () => {
        const { getByRole, getByTestId } = render(<MockedCustomisedCheckbox />);

        const checkboxComponent = getByRole('checkbox');
        await act(async () => {
            fireEvent.click(checkboxComponent);
        });
        await waitFor(() => {
            const checkedCheckboxIcon = getByTestId('CheckBoxIcon');
            expect(checkedCheckboxIcon).toBeInTheDocument();
        });
    });
});
