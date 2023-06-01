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
    describe('contains components include', () => {
        it('header in English by default', () => {
            const { getByText } = render(<MockedSuccessfulRegistration />);

            expect(getByText('Successful Registration')).toBeInTheDocument();
        });
        it('description in English by default', () => {
            const { getByText } = render(<MockedSuccessfulRegistration />);

            expect(
                getByText(
                    'Your email is registered and you shall receive a confirmation email containing the details within 24 hours. See you there!'
                )
            ).toBeInTheDocument();
        });
        it('button label in English by default', () => {
            const { getByText } = render(<MockedSuccessfulRegistration />);

            expect(getByText('Close')).toBeInTheDocument();
        });
        it(' button with label Close', () => {
            const { getByRole } = render(<MockedSuccessfulRegistration />);

            expect(getByRole('button', { name: 'Close' })).toBeInTheDocument();
        });

        it('icon button with close icon', () => {
            const { getByTestId } = render(<MockedSuccessfulRegistration />);

            expect(getByTestId('CloseIcon')).toBeInTheDocument();
        });
    });

    describe('contains basic interactions include', () => {
        it('close the dialog when close button is clicked', () => {
            const { getByRole } = render(<MockedSuccessfulRegistration />);
            const closeButton = getByRole('button', { name: 'Close' });
            fireEvent.click(closeButton);
            const dialogComponent = getByRole('dialog');

            expect(dialogComponent).not.toBeVisible();
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

    describe('contains internalization interactions include', () => {
        describe('when french language is chosen', () => {
            it('header is rendered in French', () => {
                const { getByText } = render(<MockedSuccessfulRegistration languageChosen="fr" />);

                expect(getByText('Inscription réussie')).toBeInTheDocument();
            });
            it('description is rendered in French', () => {
                const { getByText } = render(<MockedSuccessfulRegistration languageChosen="fr" />);

                expect(
                    getByText(
                        'Votre e-mail est enregistré et vous recevrez un e-mail de confirmation contenant les détails dans les 24 heures. On se voit là-bas!'
                    )
                ).toBeInTheDocument();
            });
            it('button label is rendered in French', () => {
                const { getByText } = render(<MockedSuccessfulRegistration languageChosen="fr" />);

                expect(getByText('Fermer')).toBeInTheDocument();
            });
        });
        describe('when chinese language is chosen', () => {
            it('header is rendered in Chinese', () => {
                const { getByText } = render(<MockedSuccessfulRegistration languageChosen="cn" />);

                expect(getByText('注册成功')).toBeInTheDocument();
            });
            it('description is rendered in Chinese', () => {
                const { getByText } = render(<MockedSuccessfulRegistration languageChosen="cn" />);

                expect(getByText('您的电子邮件已注册成功，您将在 24 小时内收到一封包含详细信息的确认电子邮件。 到时候那里见！')).toBeInTheDocument();
            });
            it('button label is rendered in Chinese', () => {
                const { getByText } = render(<MockedSuccessfulRegistration languageChosen="cn" />);

                expect(getByText('关闭')).toBeInTheDocument();
            });
        });
    });
});
