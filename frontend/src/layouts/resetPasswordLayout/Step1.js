import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Form, Card } from 'tabler-react'
import letterIcon from '../../assets/images/reset_password_letter.svg'
import Button from '../../components/shared/Button'
import AuthApi from '../../services/auth/api'
import CardStatusAlert, { useAlert } from '../../components/shared/Alert'

const Header = styled.div`
    display: flex;
    justify-content: space-between;
`
const HeaderSide = styled.div``
const Title = styled.h2``
const SubTitle = styled.h4`
    margin-bottom: 30px;
    font-weight: 400;
    color: rgb(151, 151, 151);
`

const StyledButton = styled(Button)`
    margin-top: 30px;
`

const Step1 = () => {
    const [email, setEmail] = useState('')
    const [status, setNoStatus, setSuccessStatus, setFailureStatus] = useAlert()

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const { t } = useTranslation('login-register')

    const resetPassword = async () => {
        try {
            setError(null)
            await AuthApi.resetPassword(email)
            setSuccess(true)
            setSuccessStatus()
        } catch (e) {
            console.error(e.json.message)
            setError(e.json.message)
            setFailureStatus()
        }
    }

    return (
        <Card>
            <CardStatusAlert status={status} onHide={setNoStatus} failText={error} />
            {success ? (
                <Card.Body>
                    <SubTitle>{t('Reset password link has been sent on your email')}</SubTitle>
                </Card.Body>
            ) : (
                <Card.Body>
                    <Header>
                        <HeaderSide>
                            <Title>{t('Write email')}</Title>
                            <SubTitle>{t('You will regain access to your account soon')}</SubTitle>
                        </HeaderSide>
                        <HeaderSide>
                            <img src={letterIcon} alt="" />
                        </HeaderSide>
                    </Header>
                    <Form.Label>{t('email')}</Form.Label>
                    <Form.Input
                        placeholder={t('email')}
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value)
                        }}
                    />
                    <StyledButton color="primary" size={'md'} onClick={resetPassword}>
                        {t('Reset password')}
                    </StyledButton>
                </Card.Body>
            )}
        </Card>
    )
}

export default Step1
