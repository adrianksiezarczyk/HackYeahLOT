import { LANGUAGE, ALLOWED_LANGUAGES_ARRAY, ALLOWED_LANGUAGE_CODES } from '../constants'

export const getLanguage = () => {
    let language = localStorage.getItem(LANGUAGE)
    let detected = navigator.language
    
    detected = detected.split('-')
    detected = ALLOWED_LANGUAGES_ARRAY.find(ls => ls === detected[0]) || ALLOWED_LANGUAGE_CODES.EN

    language = localStorage.getItem(LANGUAGE) ? localStorage.getItem(LANGUAGE) : detected
    localStorage.setItem(LANGUAGE, language)

    return language
}

export const setLanguage = lang => {
    let language = lang.toLowerCase()
    if (ALLOWED_LANGUAGES_ARRAY.some(ls => ls === language)) localStorage.setItem(LANGUAGE, language)
}
