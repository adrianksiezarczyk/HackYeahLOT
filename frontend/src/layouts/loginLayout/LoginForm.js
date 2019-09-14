import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Alert, Card, Icon, StandaloneFormPage } from 'tabler-react'
import logo from '../../assets/images/logo.png'
import { UI_BREAKPOINTS } from '../../constants'
import { getErrorMessageFromErrorCode } from '../../utils/helpers/errorCodes'
import FormCard from '../../components/FormCard'
import Button from '../../components/shared/Button'
import FormField from '../../components/form/FormField'

const PageWrapper = styled.div`
    @media (min-width: ${UI_BREAKPOINTS.MD}px) {
        width: 60%;
    }
    width: 100%;
`

const OtherSide = styled.div`
    background-image: url('https://takeshop.ams3.cdn.digitaloceanspaces.com/header-4k.jpg');
    flex-grow: 1;
    background-position: top;
    background-size: cover;
    background-color: #101b6f;
`

const LoginForm = ({
    action,
    touched,
    method,
    onSubmit,
    onChange,
    onBlur,
    values,
    errors,
    isSubmitting,
    error,
    logInError,
}) => {
    const { t } = useTranslation('login-register')
    const [showPass, setShowPass] = useState(false)
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <PageWrapper>
                <StandaloneFormPage imageURL={logo}>
                    <FormCard
                        title={t('login form title')}
                        onSubmit={onSubmit}
                        action={action}
                        method={method}
                        footer={
                            <>
                                {error && <Alert type="danger">{error}</Alert>}
                                <Button
                                    disabled={isSubmitting}
                                    loading={isSubmitting}
                                    block
                                    color="success"
                                    type="submit">
                                    {t('login')}
                                </Button>
                                <Link to={`/reset-password`}>{t('Did you forget your password?')}</Link>
                            </>
                        }>
                        {logInError && (
                            <Card.Alert color="danger">
                                {(logInError &&
                                    logInError.json &&
                                    logInError.json.code &&
                                    getErrorMessageFromErrorCode(logInError.json.code)) ||
                                    getErrorMessageFromErrorCode(null)}
                            </Card.Alert>
                        )}
                        <FormField name="email" type="email" placeholder={t('email')} label={t('email')} />
                        <FormField
                            append={
                                <Icon link name={showPass ? 'eye-off' : 'eye'} onClick={() => setShowPass(!showPass)} />
                            }
                            name="password"
                            type={showPass ? 'text' : 'password'}
                            placeholder={t('password')}
                            label={t('password')}
                        />
                    </FormCard>
                    <p>{t('first-time-message')}</p>
                    <Button
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        color="orange"
                        RootComponent={Link}
                        to={`/register`}>
                        {t('register button text')}
                    </Button>
                </StandaloneFormPage>
            </PageWrapper>
            <MediaQuery minWidth={UI_BREAKPOINTS.MD}>
                <OtherSide />
            </MediaQuery>
        </div>
    )
}

export default LoginForm
