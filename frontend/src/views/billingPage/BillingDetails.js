import { Formik } from 'formik'
import React, { useState, useEffect } from 'react'
import { Card, Dimmer, Grid, Form } from 'tabler-react'
import { PrimaryButton, SecondaryButton } from '../../components/shared/Button'
import { validationSchema, getInitialValues } from './billingDetails/BillingDetailsFormik'
import BillingDetailsForm from './billingDetails/BillingDetailsForm'
import Component from '@reach/component-component'
import BillingApi from '../../services/billing/api'
import LoadingIndicator from '../../components/shared/LoadingIndicator'

const BillingDetails = ({ t }) => {
    const [isLoading, setLoading] = useState(true)
    const [isEdited, setEdited] = useState(false)
    const [invoiceData, setInvoiceData] = useState(null)

    useEffect(() => {
        setLoading(true)
        const getInvoiceData = async () => {
            try {
                const data = await BillingApi.GetInvoiceData()
                setInvoiceData(data.invoice)
            } catch (error) {
                console.error(error)
            }
            setLoading(false)
        }
        getInvoiceData()
    }, [])

    const save = async values => {
        setLoading(true)
        try {
            await BillingApi.UpdateInvoiceData({ ...values })
            setInvoiceData({ ...values })
            setEdited(false)
        } catch (e) {
            console.error('error')
        }
        setLoading(false)
    }

    //TODO if(!invoiceData) => póki co użytkownicy mogą w ogóle nie mieć danyych
    if (isLoading) return <LoadingIndicator />
    return (
        <Grid>
            <Grid.Row justifyContent="flex-start">
                <Grid.Col md={6}>
                    <Formik
                        validationSchema={validationSchema}
                        initialValues={getInitialValues(invoiceData)}
                        onSubmit={save}
                        render={props => (
                            <Form onSubmit={props.handleSubmit}>
                                <Component
                                    formik={props}
                                    didUpdate={formikProps => {
                                        if (formikProps.prevProps.formik.values !== formikProps.props.formik.values)
                                            setEdited(true)
                                    }}
                                />
                                <Card>
                                    <Card.Header>
                                        <Card.Title>{t('invoice data')}</Card.Title>
                                        {isEdited && (
                                            <Card.Options>
                                                <PrimaryButton text={t('save')} type="submit" />
                                                <SecondaryButton
                                                    text={t('cancel')}
                                                    onClick={() => {
                                                        props.resetForm()
                                                        setEdited(false)
                                                    }}
                                                />
                                            </Card.Options>
                                        )}
                                    </Card.Header>
                                    <Card.Body>
                                        <Dimmer loader active={isLoading}>
                                            <BillingDetailsForm formProps={props} t={t} />
                                        </Dimmer>
                                    </Card.Body>
                                </Card>
                            </Form>
                        )}
                    />
                </Grid.Col>
            </Grid.Row>
        </Grid>
    )
}

export default BillingDetails
