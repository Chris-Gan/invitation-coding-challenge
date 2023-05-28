import { AppBar, Container, Toolbar, Typography } from '@mui/material';

const Footer = () => {
    return (
        <footer>
            <AppBar position="static">
                <Toolbar sx={{ textAlign: 'center', backgroundColor: 'primary', color: 'secondary' }}>
                    <Container maxWidth="sm">
                        <Typography variant="body1">© 2023 Broccoli & Co.</Typography>
                        <Typography variant="body1">All rights reserved.</Typography>
                    </Container>
                </Toolbar>
            </AppBar>
        </footer>
    );
};

export default Footer;
