import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Form, Card, Icon } from 'tabler-react'
import letterIcon from '../../assets/images/reset_password_letter.svg'
import Button from '../../components/shared/Button'
import AuthApi from '../../services/auth/api'
import CardStatusAlert, { useAlert } from '../../components/shared/Alert'
import { Link } from 'react-router-dom'

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
const ErrorMessage = styled.p`
    color: red;
`

const Step2 = ({ params }) => {
    const [password, setPassword] = useState('')
    const [passwordTest, setPasswordTest] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [showPassTest, setShowPassTest] = useState(false)

    const [status, setNoStatus, setSuccessStatus, setFailureStatus] = useAlert()

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const { t } = useTranslation('login-register')

    useEffect(() => {
        setError(null)
    }, [password, passwordTest])

    const updatePassword = async () => {
        if (password !== passwordTest) {
            setError(t("Passwords aren't the same"))
            return
        }
        try {
            setError(null)
            await AuthApi.setNewPassword({ newPassword: password, token: params.token })
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
                    <SubTitle>{t('Password has been changed successfully')}</SubTitle>
                    <Button color="orange" RootComponent={Link} to={`/`}>
                        {t('Go home page')}
                    </Button>
                </Card.Body>
            ) : (
                <Card.Body>
                    <Header>
                        <HeaderSide>
                            <Title>{t('Set new password')}</Title>
                        </HeaderSide>
                        <HeaderSide>
                            <img src={letterIcon} alt="" />
                        </HeaderSide>
                    </Header>
                    <Form.Label>{t('password')}</Form.Label>
                    <Form.InputGroup>
                        <Form.Input
                            type={showPass ? 'text' : 'password'}
                            placeholder={t('password')}
                            value={password}
                            onChange={e => {
                                setPassword(e.target.value)
                            }}
                        />
                        <Form.InputGroupAppend>
                            <Form.InputGroupText>
                                <Icon link name={showPass ? 'eye-off' : 'eye'} onClick={() => setShowPass(!showPass)} />
                            </Form.InputGroupText>
                        </Form.InputGroupAppend>
                    </Form.InputGroup>
                    <Form.Label>{t('repeat password')}</Form.Label>
                    <Form.InputGroup>
                        <Form.Input
                            type={showPassTest ? 'text' : 'password'}
                            placeholder={t('password')}
                            value={passwordTest}
                            onChange={e => {
                                setPasswordTest(e.target.value)
                            }}
                        />
                        <Form.InputGroupAppend>
                            <Form.InputGroupText>
                                <Icon
                                    link
                                    name={showPassTest ? 'eye-off' : 'eye'}
                                    onClick={() => setShowPassTest(!showPassTest)}
                                />
                            </Form.InputGroupText>
                        </Form.InputGroupAppend>
                    </Form.InputGroup>
                    <ErrorMessage>{error || ''}</ErrorMessage>
                    <StyledButton color="primary" size={'md'} onClick={updatePassword}>
                        {t('Save')}
                    </StyledButton>
                </Card.Body>
            )}
        </Card>
    )
}

export default Step2
