import { Formik } from 'formik'
import React, { createRef, Suspense, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { connect } from 'react-redux'
import RegisterForm from './registerLayout/RegisterForm'
import RegisterSchema from './registerLayout/validationSchema'
import LoadingIndicator from '../components/shared/LoadingIndicator'
import CreatingShopModal from './registerLayout/CreatingShopModal'

const RegisterLayout = ({ registerUser }) => {
    const [token, setToken] = useState(null)
    const [error, setError] = useState(null)
    const recaptchaRef = createRef()

    return (
        <Suspense fallback={<LoadingIndicator />}>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    phoneNumber: '',
                }}
                validationSchema={RegisterSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    const model = { ...values, captchaToken: token }
                    try {
                        await registerUser(model)
                        setError(null)
                        setSubmitting(false)
                    } catch (error) {
                        setError(error.json.message)
                        setSubmitting(false)
                    }
                }}
                render={({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setSubmitting,
                }) => {
                    const register = e => {
                        setSubmitting(true)
                        e.preventDefault()
                        recaptchaRef.current.reset()
                        setToken(null)
                        recaptchaRef.current.execute()
                    }
                    return (
                        <>
                            <RegisterForm
                                isSubmitting={isSubmitting}
                                onSubmit={register}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                values={values}
                                errors={errors}
                                touched={touched}
                                error={error}
                            />
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                size="invisible"
                                sitekey={process.env.REACT_APP_CAPTCHA_KEY}
                                onChange={(token, e) => {
                                    setToken(token)
                                    handleSubmit(e)
                                }}
                            />
                            <CreatingShopModal size="lg" isOpen={isSubmitting} />
                        </>
                    )
                }}
            />
        </Suspense>
    )
}

export default connect(
    null,
    ({ user: { registerUser } }) => ({
        registerUser,
    }),
)(RegisterLayout)
