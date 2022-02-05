import React from 'react'
import LayoutWrapper from '../components/LayoutWrapper';
import '../styles/globals.css'
import 'moment/locale/sv'

import { ThemeProvider } from 'next-themes'


function App({ Component, pageProps }) {
    return (
        <>
        <ThemeProvider attribute="class" defaultTheme="system">
            <LayoutWrapper>
                <Component {...pageProps} />
            </ LayoutWrapper>
        </ThemeProvider>
        </>
    );
}

export default App;