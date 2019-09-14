import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Step1 from './resetPasswordLayout/Step1'
import Step2 from './resetPasswordLayout/Step2'

const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
        max-width: 560px;
    }
`

const ResetPasswordLayout = props => {
    const [step, setStep] = useState('')

    console.log('props', props)
    const { t } = useTranslation('login-register')

    useEffect(() => {
        if (!props.match.params.step) props.history.push('/reset-password/step1')
        setStep(props.match.params.step)
    }, [props.history, props.match.params.step])

    return (
        <Container>
            {step === 'step1' && <Step1 t={t} />}
            {step === 'step2' && <Step2 t={t} params={props.match.params}/>}
        </Container>
    )
}

export default ResetPasswordLayout
