import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { LanguageChoices } from 'interfaces/languages';
import i18n from '../../../i18n/i18n';
import Footer from '../Footer';

const MockedFooter = (props: { languageChosen?: LanguageChoices }) => {
    const { languageChosen = 'en' } = props;
    i18n.changeLanguage(languageChosen);
    return (
        <I18nextProvider i18n={i18n}>
            <Footer />
        </I18nextProvider>
    );
};

describe('<Footer />', () => {
    describe('contains components include', () => {
        it('copyright text', () => {
            const { getByText } = render(<MockedFooter />);
            const copyrightElement = getByText('© 2023 Broccoli & Co.');
            expect(copyrightElement).toBeInTheDocument();
        });

        it('renders the all rights reserved text in English', () => {
            const { getByText } = render(<MockedFooter />);
            const rightsElement = getByText(/All rights reserved./i);
            expect(rightsElement).toBeInTheDocument();
        });
    });

    describe('contains internalization interactions include', () => {
        it('renders the all rights reserved text in Chinese', () => {
            const { getByText } = render(<MockedFooter languageChosen="cn" />);
            const rightsElement = getByText(/版权所有/i);
            expect(rightsElement).toBeInTheDocument();
        });

        it('renders the all rights reserved text in French', () => {
            const { getByText } = render(<MockedFooter languageChosen="fr" />);
            const rightsElement = getByText(/Tous les droits sont réservés./i);
            expect(rightsElement).toBeInTheDocument();
        });
    });
});
