export const getErrorMessageFromErrorCode = errorCode => {
    switch (errorCode) {
        case 'InvalidCredentialsException':
            return 'Błędny login lub hasło.'
        default:
            return 'Wystąpił błąd. Spróbuj ponownie.'
    }
}
