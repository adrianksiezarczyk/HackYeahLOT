import i18n from 'i18next'
import XHR from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'
import { getLanguage } from './utils/l10n'

i18n.use(XHR)
    .use(initReactI18next)
    .init({
        fallbackLng: getLanguage(),
        lng: getLanguage(),
        preload: ['pl', 'en'],
        ns: [
            'billing-page',
            'additions-page',
            'dashboard',
            'login-register',
            'product-page',
            'navigation',
            'settings-page',
            'prices-page',
            'components',
        ],
        backend: { crossDomain: true },
        //debug: process.env.NODE_ENV !== 'production',
        interpolation: {
            escapeValue: false,
        },
        react: {
            wait: true,
        },
    })
