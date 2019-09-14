import React, { useState } from 'react';
import { Card, Dimmer, Form } from 'tabler-react';
import CardStatusAlert, { useAlert } from '../../../components/shared/Alert';
import { PrimaryButton, SecondaryButton } from '../../../components/shared/Button';
import ConfigurationApi from '../../../services/configuration/api';

const NotificationEmail = ({ t, initialNotificationEmail, updateInitialEmail }) => {
    const [isEdited, setEdited] = useState(false)
    const [isLoading, setLoading] = useState(null)
    const [notificationEmail, setNotificationEmail] = useState(initialNotificationEmail)
    const [status, setNoStatus, setSuccessStatus, setFailureStatus] = useAlert()

    const updateNotificationEmail = e => {
        if (!isEdited) setEdited(true)
        setNotificationEmail(e.target.value)
    }
    const save = async () => {
        setLoading(true)
        try {
            await ConfigurationApi.updateNotificationEmail(notificationEmail)
            updateInitialEmail(notificationEmail)
            setSuccessStatus()
            setEdited(false)
        } catch (e) {
            setFailureStatus()
        }
        setLoading(false)
    }
    const cancel = () => {
        setNotificationEmail(initialNotificationEmail)
    }

    console.log(notificationEmail)
    return (
        <Card>
            <Card.Header>
                <Card.Title>{t('Notification email')}</Card.Title>
                <Card.Options>
                    {isEdited && (
                        <>
                            <PrimaryButton text={t('save')} onClick={save} />
                            <SecondaryButton text={t('cancel')} onClick={cancel} />
                        </>
                    )}
                </Card.Options>
            </Card.Header>
            <CardStatusAlert status={status} onHide={setNoStatus} />
            <Card.Body>
                <Dimmer loader active={isLoading}>
                    <Form.Input value={notificationEmail} onChange={updateNotificationEmail} />
                </Dimmer>
            </Card.Body>
        </Card>
    )
}

export default NotificationEmail
