import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useColorModeUpdate } from 'context/ModeContext';
import { LanguageChoices } from 'interfaces/languages';
import React, { useRef, useState } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const theme = useTheme();
    const updateMode = useColorModeUpdate();
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const languageButtonRef = useRef<HTMLButtonElement | null>(null);

    // Get the width of the language button
    const languageButtonWidth = languageButtonRef.current ? languageButtonRef.current.offsetWidth : null;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLanguageSelected = (language: LanguageChoices) => {
        setAnchorEl(null);
        i18n.changeLanguage(language);
    };

    const handleCloseDropdown = () => {
        setAnchorEl(null);
    };
    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Broccoli & Co.</Typography>
                <div>
                    <Button
                        id="language-button"
                        variant="outlined"
                        ref={languageButtonRef}
                        aria-controls="language-menu"
                        aria-haspopup="true"
                        color="secondary"
                        startIcon={<LanguageIcon />}
                        onClick={handleClick}
                    >
                        {t('language')}
                    </Button>
                    <Menu
                        sx={{
                            textAlign: 'center',
                            // Use the computed width for the menu
                            '& .MuiPaper-root': {
                                width: languageButtonWidth,
                            },
                        }}
                        id="language-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleCloseDropdown}
                    >
                        <MenuItem disabled={currentLanguage === 'en'} onClick={() => handleLanguageSelected('en')}>
                            {t('english')}
                        </MenuItem>
                        <MenuItem disabled={currentLanguage === 'fr'} onClick={() => handleLanguageSelected('fr')}>
                            {t('french')}
                        </MenuItem>
                        <MenuItem disabled={currentLanguage === 'cn'} onClick={() => handleLanguageSelected('cn')}>
                            {t('chinese')}
                        </MenuItem>
                    </Menu>
                    <Tooltip title={t('toggleThemeLabel')} arrow placement="bottom">
                        <IconButton sx={{ ml: 1 }} onClick={() => updateMode()} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Tooltip>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
