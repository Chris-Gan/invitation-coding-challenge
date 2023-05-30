import React, { useEffect, useState } from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import Provider from 'context/Provider';
import { LanguageChoices } from 'interfaces/languages';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n/i18n';
import SuccessfulRegistration from '../SuccessfulRegistration';

const MockedSuccessfulRegistration = (props: { languageChosen?: LanguageChoices }) => {
    const [open, setOpen] = useState(true);
    const { languageChosen = 'en' } = props;
    useEffect(() => {
        i18n.changeLanguage(languageChosen);
    }, [languageChosen]);

    return (
        <Provider>
            <I18nextProvider i18n={i18n}>
                <SuccessfulRegistration isOpened={open} handleDialogOpen={setOpen} />
            </I18nextProvider>
        </Provider>
    );
};
describe('<SuccessfulRegistration />', () => {
    it('renders the header in English by default', () => {
        const { getByText } = render(<MockedSuccessfulRegistration />);

        expect(getByText('Successful Registration')).toBeInTheDocument();
    });
    it('renders the description in English by default', () => {
        const { getByText } = render(<MockedSuccessfulRegistration />);

        expect(
            getByText('Your email is registered and you shall receive a confirmation email containing the details within 24 hours. See you there!')
        ).toBeInTheDocument();
    });
    it('renders the button label in English by default', () => {
        const { getByText } = render(<MockedSuccessfulRegistration />);

        expect(getByText('Close')).toBeInTheDocument();
    });
    it('renders the button with label Close', () => {
        const { getByRole } = render(<MockedSuccessfulRegistration />);

        expect(getByRole('button', { name: 'Close' })).toBeInTheDocument();
    });

    it('close the dialog when close button is clicked', () => {
        const { getByRole } = render(<MockedSuccessfulRegistration />);
        const closeButton = getByRole('button', { name: 'Close' });
        fireEvent.click(closeButton);
        const dialogComponent = getByRole('dialog');

        expect(dialogComponent).not.toBeVisible();
    });

    it('renders the icon button with close icon', () => {
        const { getByTestId } = render(<MockedSuccessfulRegistration />);

        expect(getByTestId('CloseIcon')).toBeInTheDocument();
    });

    it('close the dialog when icon button is clicked', () => {
        const screen = render(<MockedSuccessfulRegistration />);
        const { getAllByRole, getByRole } = screen;
        // screen.debug();
        const iconButton = getAllByRole('button')[0];
        fireEvent.click(iconButton);
        const dialogComponent = getByRole('dialog');

        expect(dialogComponent).not.toBeVisible();
    });
});
