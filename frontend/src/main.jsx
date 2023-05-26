import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme } from './utils/theme.js';
import * as locales from '@mui/material/locale';

const App = () => {
    const [locale, setLocale] = useState('ukUA');
    const themeWithLocale = useMemo(() => createTheme(theme, locales[locale]), [locale, theme]);

    return (
        <React.StrictMode>
            <ThemeProvider theme={themeWithLocale}>
                <Provider store={store}>
                    <RouterProvider router={router} />
                </Provider>
            </ThemeProvider>
        </React.StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
