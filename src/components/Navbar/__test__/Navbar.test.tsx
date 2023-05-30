import '@testing-library/jest-dom';
import React, { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { LanguageChoices } from 'interfaces/languages';
import Provider from 'context/Provider';
import { fireEvent, render } from '@testing-library/react';
import i18n from '../../../i18n/i18n';
import Navbar from '../Navbar';

jest.mock('context/ModeContext', () => ({
    useColorModeUpdate: () => jest.fn(),
    toggleColorModeContext: ({ children }: { children: ReactNode }) => children, // just pass children through for test
}));
const MockedNavbar = (props: { languageChosen?: LanguageChoices }) => {
    const { languageChosen = 'en' } = props;
    i18n.changeLanguage(languageChosen);
    return (
        <Provider>
            <I18nextProvider i18n={i18n}>
                <Navbar />
            </I18nextProvider>
        </Provider>
    );
};

describe('<Navbar />', () => {
    it('renders the company name text', () => {
        const { getByText } = render(<MockedNavbar />);
        const companyNameElement = getByText('Broccoli & Co.');
        expect(companyNameElement).toBeInTheDocument();
    });
    it('renders the language button correctly', () => {
        const { getByTestId } = render(<MockedNavbar />);
        const languageElement = getByTestId('languageButton');
        expect(languageElement).toBeInTheDocument();
    });

    it('renders the language button label in English', () => {
        const { getByText } = render(<MockedNavbar />);
        const buttonLabelElement = getByText(/Language/i);
        expect(buttonLabelElement).toBeInTheDocument();
    });

    it('renders the language button label in Chinese', () => {
        const { getByText } = render(<MockedNavbar languageChosen="cn" />);
        const buttonLabelElement = getByText(/语言/i);
        expect(buttonLabelElement).toBeInTheDocument();
    });

    it('renders the language button label in French', () => {
        const { getByText } = render(<MockedNavbar languageChosen="fr" />);
        const buttonLabelElement = getByText(/Langue/i);
        expect(buttonLabelElement).toBeInTheDocument();
    });

    it('opens the language dropdown when language button is clicked', () => {
        const { getByTestId, getByRole } = render(<MockedNavbar />);
        const languageElement = getByTestId('languageButton');
        fireEvent.click(languageElement);
        const languageMenu = getByRole('menu');
        expect(languageMenu).toBeVisible();
    });

    it('disables the current language in the dropdown menu', () => {
        const { getByTestId, getByRole } = render(<MockedNavbar />);
        const languageElement = getByTestId('languageButton');
        fireEvent.click(languageElement);
        const menuItem = getByRole('menuitem', { name: 'English' });
        expect(menuItem).toHaveAttribute('aria-disabled', 'true');
    });

    it('language selected will be disabled', () => {
        const { getByTestId, getByRole } = render(<MockedNavbar />);
        const languageButton = getByTestId('languageButton');
        fireEvent.click(languageButton);
        const menuItem = getByRole('menuitem', { name: 'French' });
        fireEvent.click(menuItem);
        expect(menuItem).toHaveAttribute('aria-disabled', 'true');
    });

    it('renders the theme icon button', () => {
        const { getByTestId } = render(<MockedNavbar />);
        const themeIconButton = getByTestId('themeButton');
        expect(themeIconButton).toBeInTheDocument();
    });

    it('renders the theme icon button with default icon', () => {
        const { getByTestId } = render(<MockedNavbar />);

        const themeIconButton = getByTestId('themeButton');
        expect(themeIconButton).toBeInTheDocument();
    });

    it('displays correct default light theme icon', () => {
        const { getByTestId } = render(<MockedNavbar />);

        const lightThemeIcon = getByTestId('Brightness4Icon');
        expect(lightThemeIcon).toBeInTheDocument();
    });
});
