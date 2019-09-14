import { TOKEN_INFO } from '../constants'

export const isLoggedIn = () => {
    const isLoggedIn = !!localStorage.getItem(TOKEN_INFO)
    return isLoggedIn
}
export const setLoginToken = ({ token }) => {
    const tokenDetails = decodeToken(token)
    tokenDetails.token = token
    localStorage.setItem(TOKEN_INFO, JSON.stringify(tokenDetails))
}
export const getUserEmail = () => {
    if (!isLoggedIn()) return null
    const tokenInfo = JSON.parse(localStorage.getItem(TOKEN_INFO))
    return tokenInfo.email
}

export const getToken = () => {
    const tokenInfo = JSON.parse(localStorage.getItem(TOKEN_INFO))
    if (!tokenInfo) return null
    return tokenInfo.token
}

export const getTokenExpiryDate = () => {
    if (!isLoggedIn()) return null
    const tokenInfo = JSON.parse(localStorage.getItem(TOKEN_INFO))
    const expiryDate = new Date(Number(tokenInfo.exp) * 1000)
    return expiryDate
}

export const getTokenInfo = () => {
    if (!isLoggedIn()) return null
    return localStorage.getItem(TOKEN_INFO)
}

export const decodeToken = token => {
    try {
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        return JSON.parse(window.atob(base64))
    } catch (error) {
        return null
    }
}
