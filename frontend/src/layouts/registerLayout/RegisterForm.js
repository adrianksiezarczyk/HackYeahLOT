import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Alert, Icon, StandaloneFormPage } from 'tabler-react'
import logo from '../../assets/images/logo.png'
import { UI_BREAKPOINTS } from '../../constants'
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
`

const RegisterForm = ({ action, touched, method, onSubmit, onChange, onBlur, values, errors, isSubmitting, error }) => {
    const { t } = useTranslation('login-register')
    const [showPass, setShowPass] = useState(false)
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <PageWrapper>
                <StandaloneFormPage imageURL={logo}>
                    {/* <Brand>
                        <BrandImage alt="TakeDrop" src={logo} />
                    </Brand> */}
                    <FormCard
                        title={t('register form title')}
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
                                    {t('register button text')}
                                </Button>
                            </>
                        }>
                        <FormField name="firstName" placeholder={t('first name')} label={t('first name')} />
                        <FormField name="lastName" placeholder={t('last name')} label={t('last name')} />
                        <FormField name="phoneNumber" placeholder={t('phone number')} label={t('phone number')} />
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
                    <p>{t('have-account-message')}</p>
                    <Button
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        color="orange"
                        RootComponent={Link}
                        to={`/login`}>
                        {t('login')}
                    </Button>
                </StandaloneFormPage>
            </PageWrapper>
            <MediaQuery minWidth={UI_BREAKPOINTS.MD}>
                <OtherSide />
            </MediaQuery>
        </div>
    )
}

export default RegisterForm
