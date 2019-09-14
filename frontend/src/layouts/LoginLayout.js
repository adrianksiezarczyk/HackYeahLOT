import { Formik } from 'formik'
import React, { Suspense, useState } from 'react'
// import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LoginForm from './loginLayout/LoginForm'
import LoadingIndicator from '../components/shared/LoadingIndicator'
import { isLoggedIn } from '../utils/auth'

const LoginLayout = ({ logIn }) => {
    const [error, setError] = useState(null)

    if (isLoggedIn()) return <Redirect to={`/`} />

    // const { t } = useTranslation('login-register')
    return (
        <Suspense fallback={<LoadingIndicator />}>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validate={values => {
                    let errors = {}
                    if (!values.email) {
                        errors.email = 'Required'
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                        errors.email = 'Invalid email address'
                    }
                    if (!values.password) {
                        errors.password = 'Required'
                    }
                    return errors
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    setError(null)
                    setSubmitting(true)
                    try {
                        await logIn(values)
                        setSubmitting(false)
                    } catch (error) {
                        console.error(error)
                        setError(error)
                        setSubmitting(false)
                    }
                }}
                render={({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    <>
                        <LoginForm
                            onSubmit={handleSubmit}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            values={values}
                            errors={errors}
                            touched={touched}
                            isSubmitting={isSubmitting}
                            logInError={error}
                        />
                    </>
                )}
            />
        </Suspense>
    )
}

export default connect(
    null,
    ({ user: { logIn } }) => ({
        logIn,
    }),
)(LoginLayout)
