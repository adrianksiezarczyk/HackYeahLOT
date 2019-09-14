import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Form, Card, Button, Dimmer } from 'tabler-react'
import { useTranslation } from 'react-i18next'
import ShopApi from '../../services/shop/api'
import { PrimaryButton, SecondaryButton } from '../../components/shared/Button'
import { SuccessCardAlert, FailureCardAlert } from '../../components/shared/Alert'
import { STATUSES, UI_BREAKPOINTS } from '../../constants'
import TakeAlert from '../../utils/takeAlert'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Container = styled.div`
    column-count: 2 !important;
    @media (max-width: ${UI_BREAKPOINTS.SM}px) {
        column-count: 1 !important;
    }
    width: 100%;
    margin-top: 15px;
`

const RestoreDomainButton = styled.div`
    display: flex;
    justify-content: flex-end;
`

const CARD_INDEX = { UPDATE: 1, RESTORE: 3 }
const INITIAL_STATUS = { cardIndex: null, status: null, message: null }
const Domain = ({ isTrialPlan }) => {
    const [isLoading, setLoading] = useState(null)
    const [domainInfo, setDomainInfo] = useState(null)
    const [domainName, setDomainName] = useState(null)
    const [status, setStatus] = useState(INITIAL_STATUS)
    const [t] = useTranslation('settings-page')

    useEffect(() => {
        const getDomain = async () => {
            try {
                const domainInfo = await ShopApi.getDomain()
                setDomainInfo(domainInfo)
                setDomainName(domainInfo.domain)
            } catch (e) {}
        }
        getDomain()
    }, [])

    const updateDomain = async (domain, cardIndex) => {
        setLoading(true)
        try {
            await ShopApi.updateDomain(domain)
            domainInfo.domain = domain
            setDomainName(domain)
            setDomainInfo(domainInfo)
            setStatus({ cardIndex, status: STATUSES.SUCCESS })
        } catch (e) {
            setStatus({ cardIndex, status: STATUSES.FAIL, message: e.json.message })
        }
        setLoading(false)
    }
    const cancel = () => setDomainName(domainInfo.domain)
    const setDefaultDomain = async e => {
        e.preventDefault()
        const result = await TakeAlert.fire({
            title: `Jesteś pewien?`,
            text: 'Przywroć domenę domyślną',
            showCancelButton: true,
            cancelButtonText: 'Anuluj',
            confirmButtonText: 'Przywróć',
            type: 'warning',
            allowEscapeKey: true,
            allowOutsideClick: true,
            reverseButtons: true,
        })
        if (result.value) {
            updateDomain(domainInfo.internalDomain, CARD_INDEX.RESTORE)
        }
        if (result.dismiss === 'backdrop' || result.dismiss === 'esc') return
    }
    const CardStatusAlert = ({ cardIndex }) => {
        const hide = () => setStatus(INITIAL_STATUS)

        if (!status.status || cardIndex !== status.cardIndex) return null
        if (status.status === STATUSES.SUCCESS) return <SuccessCardAlert onHide={hide} />
        else if (status.status === STATUSES.FAIL) return <FailureCardAlert onHide={hide} text={status.message} />
    }

    if (!domainInfo) return null
    return (
        <Container className="card-columns">
            <>
                <Card>
                    <Card.Header>
                        <Card.Title>{t('Your domain')}</Card.Title>
                        {domainName !== domainInfo.domain && !isLoading && (
                            <Card.Options>
                                <PrimaryButton
                                    text={t('Save')}
                                    onClick={() => updateDomain(domainName, CARD_INDEX.UPDATE)}
                                />
                                <SecondaryButton text={t('Cancel')} onClick={cancel} />
                            </Card.Options>
                        )}
                    </Card.Header>
                    <CardStatusAlert cardIndex={CARD_INDEX.UPDATE} />
                    <Card.Body>
                        <Dimmer loader active={isLoading}>
                            <Form>
                                {isTrialPlan && (
                                    <p>
                                        <Link to="/billing/invoices">{t('Pay for invoice')}</Link>{' '}
                                        {t('to change domain')}.
                                    </p>
                                )}
                                <Form.Group label={t('Domain name')}>
                                    <Form.Input
                                        name={'domain'}
                                        value={domainName || ''}
                                        type={'text'}
                                        disabled={isTrialPlan}
                                        onChange={e => {
                                            setDomainName(e.target.value)
                                        }}
                                    />
                                </Form.Group>
                            </Form>
                        </Dimmer>
                    </Card.Body>
                </Card>
            </>
            <>
                <Card>
                    <Card.Header>
                        <Card.Title>{t('Restoring default domain')}</Card.Title>
                    </Card.Header>
                    <CardStatusAlert cardIndex={CARD_INDEX.RESTORE} />
                    <Card.Body>
                        <Dimmer loader active={isLoading}>
                            <p>{t('Restore domain text')}</p>
                            {!isTrialPlan && (
                                <RestoreDomainButton>
                                    <Button color="info" onClick={setDefaultDomain}>
                                        {t('Restore default domain')}
                                    </Button>
                                </RestoreDomainButton>
                            )}
                        </Dimmer>
                    </Card.Body>
                </Card>
            </>
            <>
                <Card>
                    <Card.Header>
                        <Card.Title>{t('DNS configurations')}</Card.Title>
                    </Card.Header>

                    <Card.Body>
                        {!domainInfo.dnsServers || !domainInfo.dnsServers.length ? (
                            <p>{t('ownDomain-noDNS')}</p>
                        ) : (
                            <>
                                <h5> {t('ownDomain-1')}:</h5>
                                {domainInfo.dnsServers.map(dnsServer => {
                                    return (
                                        <p key={dnsServer} style={{ marginLeft: '15px' }}>
                                            {dnsServer}
                                        </p>
                                    )
                                })}
                                {!domainInfo.dnsServers ||
                                    (!domainInfo.dnsServers.length && (
                                        <p>
                                            {t(
                                                'addresses will appear after checking and saving the newly given domain',
                                            )}
                                        </p>
                                    ))}
                                <h5>{t('ownDomain-2')}.</h5>
                                <p>
                                    {t(
                                        'The state of propagation of changes in DNS can be checked with some approximation here',
                                    )}
                                    :{' '}
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://dnschecker.org/#NS/{{ domain.domain }}">
                                        https://dnschecker.org/#NS/{domainInfo.domain}
                                    </a>
                                    . {t('All locations should point to the servers listed above')}.
                                </p>
                                <p>
                                    <strong>{t('SSL certificate')}</strong>{' '}
                                    {t('will be generated automatically when the DNS propagation ends')}.
                                </p>
                            </>
                        )}
                    </Card.Body>
                </Card>
            </>
        </Container>
    )
}
export default connect(state => ({
    isTrialPlan: state.auth.isTrialPlan,
}))(Domain)
