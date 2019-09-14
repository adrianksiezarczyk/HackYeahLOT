import React, { useState, useEffect } from 'react'
import { Grid } from 'tabler-react'
import { useTranslation } from 'react-i18next'
import EmailTemplateApi from '../../services/emailTemplate/api'
import LoadingIndicator from '../../components/shared/LoadingIndicator'
import OrderApi from '../../services/order/api'
import EmailTemplates from './emails/EmailTemplates'
import OrderStatuses from './emails/OrderStatuses'
import NotificationEmail from './emails/NotificationEmail'
import ConfigurationApi from '../../services/configuration/api'

const Emails = () => {
    const [emailTemplates, setEmailTemplates] = useState(null)
    const [orderStatuses, setOrderStatuses] = useState(null)
    const [notificationEmail, setNotificationEmail] = useState(null)

    const [t] = useTranslation('settings-page')

    useEffect(() => {
        const fetch = async () => {
            try {
                await getStatuses()
                await getEmailTemplates()
                await getNotificationEmail()
            } catch (e) {}
        }
        fetch()
    }, [])

    const getNotificationEmail = async () => {
        try {
            const response = await ConfigurationApi.getNotificationEmail()
            setNotificationEmail(response.notificationEmail)
        } catch (e) {}
    }
    const updateInitialEmail = email => setNotificationEmail(email)

    const getEmailTemplates = async () => {
        try {
            const emailTemplates = await EmailTemplateApi.getAll()
            setEmailTemplates(emailTemplates)
        } catch (e) {}
    }

    const getStatuses = async () => {
        try {
            const orderStatuses = await OrderApi.getStatuses()
            setOrderStatuses(orderStatuses)
        } catch (e) {}
    }

    if (!orderStatuses || !emailTemplates || notificationEmail === null) return <LoadingIndicator />
    return (
        <Grid.Row>
            <Grid.Col md={6}>
                <NotificationEmail
                    t={t}
                    initialNotificationEmail={notificationEmail}
                    updateInitialEmail={updateInitialEmail}
                />
                <EmailTemplates emailTemplates={emailTemplates} t={t} refresh={getEmailTemplates} />
            </Grid.Col>
            <Grid.Col md={6}>
                <OrderStatuses initialOrderStatuses={orderStatuses} emailTemplates={emailTemplates} t={t} />
            </Grid.Col>
        </Grid.Row>
    )
}

export default Emails
