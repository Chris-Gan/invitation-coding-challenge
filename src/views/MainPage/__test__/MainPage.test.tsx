import React from 'react';
import '@testing-library/jest-dom';
import { act, cleanup, fireEvent, render } from '@testing-library/react';
import Provider from 'context/Provider';
import { LanguageChoices } from 'interfaces/languages';
import { I18nextProvider } from 'react-i18next';
import { postInvitationRegistration } from 'services/backendServices';
import i18n from '../../../i18n/i18n';
import MainPage from '../MainPage';

jest.mock('services/backendServices', () => ({
    postInvitationRegistration: jest.fn(),
}));

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

describe('<MainPage />', () => {
    afterEach(() => {
        cleanup();
        jest.resetAllMocks();
    });
    describe('contains components include', () => {
        it(' header', async () => {
            const screen = await act(async () => render(<MockedMainPage />));

            expect(await screen.findByTestId('mainPageHeader')).toBeInTheDocument();
        });
        it(' subheader', async () => {
            const screen = await act(async () => render(<MockedMainPage />));

            expect(await screen.findByTestId('mainPageSubheader')).toBeInTheDocument();
        });
        it('invite button', async () => {
            const screen = await act(async () => render(<MockedMainPage />));

            expect(await screen.findByTestId('inviteButtonLabel')).toBeInTheDocument();
        });
    });

    describe('contains basic interactions include', () => {
        it('renders loading screen when form is submitted', async () => {
            const screen = render(<MockedMainPage />);
            const inviteButton = screen.getByTestId('inviteButtonLabel');

            (postInvitationRegistration as jest.Mock).mockImplementation(
                () =>
                    new Promise((resolve) => {
                        setTimeout(() => resolve({}), 500);
                    })
            );

            await act(async () => {
                fireEvent.click(inviteButton);
            });

            const formSubmitButton = screen.getByTestId('registrationFormSubmitBtn');
            await act(async () => {
                fireEvent.click(formSubmitButton);
            });

            expect(await screen.findByTestId('loader')).toBeInTheDocument();
        });
    });
});
