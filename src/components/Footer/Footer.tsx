import React from 'react';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer>
            <AppBar position="static">
                <Toolbar sx={{ textAlign: 'center', backgroundColor: 'primary', color: 'secondary' }}>
                    <Container maxWidth="sm">
                        <Typography variant="body1">© 2023 Broccoli & Co.</Typography>
                        <Typography variant="body1">{t('allRightsReservedLabel')}</Typography>
                    </Container>
                </Toolbar>
            </AppBar>
        </footer>
    );
};

export default Footer;
