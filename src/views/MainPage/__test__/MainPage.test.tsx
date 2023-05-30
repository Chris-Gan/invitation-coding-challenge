/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import '@testing-library/jest-dom';
import { act, cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import Provider from 'context/Provider';
import { LanguageChoices } from 'interfaces/languages';
import { I18nextProvider } from 'react-i18next';
import { postInvitationRegistration } from 'services/backendServices';
import i18n from '../../../i18n/i18n';
import MainPage from '../MainPage';

const MockedMainPage = (props: { languageChosen?: LanguageChoices }) => {
    const { languageChosen = 'en' } = props;
    i18n.changeLanguage(languageChosen);
    return (
        <Provider>
            <I18nextProvider i18n={i18n}>
                <MainPage />
            </I18nextProvider>
        </Provider>
    );
};

jest.mock('services/backendServices', () => ({
    postInvitationRegistration: jest.fn(),
}));

describe('<MainPage />', () => {
    it('renders main page header', async () => {
        const screen = await act(async () => render(<MockedMainPage />));

        expect(await screen.findByTestId('mainPageHeader')).toBeInTheDocument();
    });
    it('renders main page subheader', async () => {
        const screen = await act(async () => render(<MockedMainPage />));

        expect(await screen.findByTestId('mainPageSubheader')).toBeInTheDocument();
    });
    it('renders main page invite button', async () => {
        const screen = await act(async () => render(<MockedMainPage />));

        expect(await screen.findByTestId('inviteButtonLabel')).toBeInTheDocument();
    });
    it('renders main page elements and opens registration form dialog when button is clicked', async () => {
        const screen = render(<MockedMainPage />);

        const inviteButton = screen.getByTestId('inviteButtonLabel');
        await act(async () => {
            fireEvent.click(inviteButton);
        });

        expect(await screen.findByRole('dialog')).toBeInTheDocument();
    });
});
