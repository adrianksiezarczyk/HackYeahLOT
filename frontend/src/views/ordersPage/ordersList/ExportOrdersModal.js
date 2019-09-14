import React, {  useState } from 'react'
import styled from 'styled-components'
import { Icon, Grid, Form, Dimmer } from 'tabler-react'
import BaseModal from '../../../components/shared/BaseModal'
import Button from '../../../components/shared/Button'
import CardStatusAlert, { useAlert } from '../../../components/shared/Alert'
import OrderApi from '../../../services/order/api'
import { getLanguage } from '../../../utils/l10n'
import DateTimePicker from 'react-datetime-picker'
import { convertToCsv } from '../../../utils/helpers/convertToCsv'

const StyledDatePicker = styled(DateTimePicker)`
    ${`.react-datetime-picker__wrapper`} {
        border: none !important;
    }
`

const INPUT_NAME = {
    DATE_FROM: 'dateFrom',
    DATE_TO: 'dateTo',
    REALIZATION_DATE_FROM: 'realizationDateFrom',
    REALIZATION_DATE_TO: 'realizationDateTo',
}

const createAndDownloadFile = (fileName, data, type) => {
    const a = document.createElement('a')
    a.setAttribute('style', 'display:none;')
    document.body.appendChild(a)
    const blob = new Blob([data], { type: type })
    const url = window.URL.createObjectURL(blob)
    a.href = url
    a.download = fileName
    a.click()
}

const ExportOrdersModal = ({ isOpen, onCloseModal, t }) => {
    const [isLoading, setLoading] = useState(false)
    const [status, setNoStatus] = useAlert()

    const [model, setModel] = useState({
        [INPUT_NAME.DATE_FROM]: null,
        [INPUT_NAME.DATE_TO]: null,
        [INPUT_NAME.REALIZATION_DATE_FROM]: null,
        [INPUT_NAME.REALIZATION_DATE_TO]: null,
    })


    const updateModel = (key, value) => {
        setModel({ ...model, [key]: value })
    }

    const closeModal = () => {
        setNoStatus()
        onCloseModal()
    }
    const getOrders = async () => {
        setLoading(true)

        const orders = await OrderApi.getOrdersToExport(model)
        orders.forEach(d => {
            d.amountRecieved = d.amountRecieved.toString().replace('.', ',')
            d.amountPaid = d.amountPaid.toString().replace('.', ',')
            d.currencyRate = d.currencyRate ? d.currencyRate.toString().replace('.', ',') : 0
            delete d.placingOrderDate
            delete d.date
        })

        const csvData = convertToCsv(orders, false)
        createAndDownloadFile(`zamowienia-eksport.csv`, csvData, 'text/csv')

        setLoading(false)
    }

    if (!isOpen) return null
    return (
        <BaseModal
            size="lg"
            isOpen={isOpen}
            onCloseModal={closeModal}
            title={t('export orders')}
            actions={<Icon link name="x" onClick={closeModal} />}
            footer={
                <>
                    <Button className="mr-2" color="primary" size="sm" onClick={() => getOrders()}>
                        {t('export')}
                    </Button>
                    <Button color="secondary" size="sm" onClick={closeModal}>
                        {t('cancel')}
                    </Button>
                </>
            }>
            <CardStatusAlert status={status} onHide={setNoStatus} autoCanelDisabled />
            <Dimmer loader active={isLoading}>
                <Form>
                    <Grid>
                        <Grid.Row>
                            <Grid.Col md={4}>
                                <Form.Group>
                                    <Form.Label>{t('date from')}</Form.Label>
                                    <StyledDatePicker
                                        className="form-control"
                                        onChange={date => updateModel(INPUT_NAME.DATE_FROM, date)}
                                        value={
                                            model[INPUT_NAME.DATE_FROM] ? new Date(model[INPUT_NAME.DATE_FROM]) : null
                                        }
                                        disableClock
                                        format="dd/MM/yyyy"
                                        clearIcon={<Icon name="x" />}
                                        calendarIcon={<Icon name="calendar" />}
                                        locale={getLanguage()}
                                        name={INPUT_NAME.DATE_FROM}
                                    />
                                </Form.Group>
                            </Grid.Col>
                            <Grid.Col md={4}>
                                <Form.Group>
                                    <Form.Label>{t('date to')}</Form.Label>
                                    <StyledDatePicker
                                        className="form-control"
                                        onChange={date => updateModel(INPUT_NAME.DATE_TO, date)}
                                        value={model[INPUT_NAME.DATE_TO] ? new Date(model[INPUT_NAME.DATE_TO]) : null}
                                        disableClock
                                        format="dd/MM/yyyy"
                                        clearIcon={<Icon name="x" />}
                                        calendarIcon={<Icon name="calendar" />}
                                        locale={getLanguage()}
                                        name={INPUT_NAME.DATE_TO}
                                    />
                                </Form.Group>
                            </Grid.Col>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Col md={4}>
                                <Form.Group>
                                    <Form.Label>{t('realization date from')}</Form.Label>
                                    <StyledDatePicker
                                        className="form-control"
                                        onChange={date => updateModel(INPUT_NAME.REALIZATION_DATE_FROM, date)}
                                        value={
                                            model[INPUT_NAME.REALIZATION_DATE_FROM]
                                                ? new Date(model[INPUT_NAME.REALIZATION_DATE_FROM])
                                                : null
                                        }
                                        disableClock
                                        format="dd/MM/yyyy"
                                        clearIcon={<Icon name="x" />}
                                        calendarIcon={<Icon name="calendar" />}
                                        locale={getLanguage()}
                                        name={INPUT_NAME.REALIZATION_DATE_FROM}
                                    />
                                </Form.Group>
                            </Grid.Col>
                            <Grid.Col md={4}>
                                <Form.Group>
                                    <Form.Label>{t('realization date to')}</Form.Label>
                                    <StyledDatePicker
                                        className="form-control"
                                        onChange={date => updateModel(INPUT_NAME.REALIZATION_DATE_TO, date)}
                                        value={
                                            model[INPUT_NAME.REALIZATION_DATE_TO]
                                                ? new Date(model[INPUT_NAME.REALIZATION_DATE_TO])
                                                : null
                                        }
                                        disableClock
                                        format="dd/MM/yyyy"
                                        clearIcon={<Icon name="x" />}
                                        calendarIcon={<Icon name="calendar" />}
                                        locale={getLanguage()}
                                        name={INPUT_NAME.REALIZATION_DATE_TO}
                                    />
                                </Form.Group>
                            </Grid.Col>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Dimmer>
        </BaseModal>
    )
}

export default ExportOrdersModal
