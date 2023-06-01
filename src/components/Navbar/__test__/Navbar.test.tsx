import '@testing-library/jest-dom';
import React, { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { LanguageChoices } from 'interfaces/languages';
import Provider from 'context/Provider';
import { fireEvent, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
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
    describe('contains components include', () => {
        it('company name text', () => {
            const { getByText } = render(<MockedNavbar />);
            const companyNameElement = getByText('Broccoli & Co.');
            expect(companyNameElement).toBeInTheDocument();
        });

        it('language button ', () => {
            const { getByTestId } = render(<MockedNavbar />);
            const languageElement = getByTestId('languageButton');
            expect(languageElement).toBeInTheDocument();
        });
        it('language button label in English by default', () => {
            const { getByText } = render(<MockedNavbar />);
            const buttonLabelElement = getByText(/Language/i);
            expect(buttonLabelElement).toBeInTheDocument();
        });

        it('theme icon button', () => {
            const { getByTestId } = render(<MockedNavbar />);
            const themeIconButton = getByTestId('themeButton');
            expect(themeIconButton).toBeInTheDocument();
        });

        it('renders the theme icon button with default icon', () => {
            const { getByTestId } = render(<MockedNavbar />);

            const themeIconButton = getByTestId('themeButton');
            expect(themeIconButton).toBeInTheDocument();
        });
    });

    describe('contains basic interactions include', () => {
        it('opens the language dropdown when language button is clicked', () => {
            const { getByTestId, getByRole } = render(<MockedNavbar />);
            const languageElement = getByTestId('languageButton');
            fireEvent.click(languageElement);
            const languageMenu = getByRole('menu');
            expect(languageMenu).toBeVisible();
        });
        it('language dropdown contains language options in English', () => {
            const { getByTestId, getByRole } = render(<MockedNavbar />);
            const languageElement = getByTestId('languageButton');
            fireEvent.click(languageElement);
            const englishMenuItem = getByRole('menuitem', { name: 'English' });
            const frenchMenuItem = getByRole('menuitem', { name: 'French' });
            const chineseMenuItem = getByRole('menuitem', { name: 'Chinese' });
            expect(englishMenuItem).toBeVisible();
            expect(frenchMenuItem).toBeVisible();
            expect(chineseMenuItem).toBeVisible();
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
    });

    describe('contains internalization interactions include', () => {
        describe('when french language is chosen', () => {
            it('language button label is changed into French', () => {
                const { getByText } = render(<MockedNavbar languageChosen="fr" />);
                const buttonLabelElement = getByText(/Langue/i);
                expect(buttonLabelElement).toBeInTheDocument();
            });
            it('language dropdown is containing language choices in French', () => {
                const { getByTestId, getByRole } = render(<MockedNavbar languageChosen="fr" />);
                const languageElement = getByTestId('languageButton');
                fireEvent.click(languageElement);
                const englishMenuItem = getByRole('menuitem', { name: "l' Anglais" });
                const frenchMenuItem = getByRole('menuitem', { name: 'le chinois' });
                const chineseMenuItem = getByRole('menuitem', { name: 'le chinois' });
                expect(englishMenuItem).toBeVisible();
                expect(frenchMenuItem).toBeVisible();
                expect(chineseMenuItem).toBeVisible();
            });
        });
        describe('when chinese language is chosen', () => {
            it('language button label is changed into Chinese', () => {
                const { getByText } = render(<MockedNavbar languageChosen="cn" />);
                const buttonLabelElement = getByText(/语言/i);
                expect(buttonLabelElement).toBeInTheDocument();
            });
            it('language dropdown is containing language choices in Chinese', () => {
                const { getByTestId, getByRole } = render(<MockedNavbar languageChosen="cn" />);
                const languageElement = getByTestId('languageButton');
                fireEvent.click(languageElement);
                const englishMenuItem = getByRole('menuitem', { name: '英文' });
                const frenchMenuItem = getByRole('menuitem', { name: '法语' });
                const chineseMenuItem = getByRole('menuitem', { name: '中文' });
                expect(englishMenuItem).toBeVisible();
                expect(frenchMenuItem).toBeVisible();
                expect(chineseMenuItem).toBeVisible();
            });
        });
    });

    describe('contains theme related interactions', () => {
        describe('when light mode is chosen', () => {
            it('correct default light theme icon is rendered', () => {
                const { getByTestId } = render(<MockedNavbar />);

                const lightThemeIcon = getByTestId('Brightness4Icon');
                expect(lightThemeIcon).toBeInTheDocument();
            });
        });
        describe('when dark mode is chosen', () => {
            it('correct default dark theme icon is rendered', () => {
                const { getByTestId, getAllByRole } = render(<MockedNavbar />);
                const themeButton = getAllByRole('button')[1];
                act(() => fireEvent.click(themeButton));
                const darkThemeIcon = getByTestId('Brightness4Icon');
                expect(darkThemeIcon).toBeInTheDocument();
            });
        });
    });
});
