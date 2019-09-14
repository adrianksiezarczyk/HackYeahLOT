import { Formik } from 'formik'
import React from 'react'
import DateTimePicker from 'react-datetime-picker'
import { useTranslation } from 'react-i18next'
import Select from 'react-select'
import styled from 'styled-components'
import { Form, Icon } from 'tabler-react'
import withCurrentShop from '../../../components/HOCs/withCurrentShop'
import BaseModal from '../../../components/shared/BaseModal'
import Button from '../../../components/shared/Button'
import FormField from '../../../components/form/FormField'
import PricesApi from '../../../services/prices/api'
import { getLanguage } from '../../../utils/l10n'
import TakeAlert from '../../../utils/takeAlert'

const StyledDatePicker = styled(DateTimePicker)`
    ${`.react-datetime-picker__wrapper`} {
        border: none !important;
    }
`

const DiscountModal = ({ discount, isOpen, onCloseModal }) => {
    const [t] = useTranslation('prices-page')
    const codeTypes = [{ label: t('percent-type'), value: 0 }, { label: t('amount-type'), value: 1 }]
    return (
        <Formik
            onSubmit={async values => {
                const model = {
                    ...(discount.id && { id: discount.id }),
                    ...values,
                }
                try {
                    let result
                    if ('id' in model) result = await PricesApi.updateDiscount(model)
                    else result = await PricesApi.addDiscount(model)
                    if (result.ok) {
                        TakeAlert.fire({
                            type: 'success',
                            title: t('saved-exclamation-mark'),
                        }).finally(() => onCloseModal())
                    }
                } catch (error) {
                    console.error(error)
                    TakeAlert.fire({
                        type: 'error',
                        title: t('error-during-saving'),
                    }).finally(() => onCloseModal())
                }
            }}
            enableReinitialize
            initialValues={{
                code: discount.code || '',
                discountType: discount.discountType || '',
                startDate: discount.startDate || '',
                endDate: discount.endDate || '',
                minOrderValue: discount.minOrderValue || '',
                value: discount.value || '',
            }}
            render={props => {
                return (
                    <BaseModal
                        isOpen={isOpen}
                        onCloseModal={onCloseModal}
                        title={discount ? discount.code : t('adding-discount')}
                        actions={<Icon link name="x" onClick={onCloseModal} />}
                        footer={
                            <Button className="mr-2" color="primary" size="sm" onClick={props.handleSubmit}>
                                {t('save-changes')}
                            </Button>
                        }>
                        <Form>
                            <FormField name="code" label={t('code')} placeholder={t('code')} />
                            <Form.Group label={t('code-type')}>
                                <Select
                                    options={codeTypes}
                                    value={codeTypes.find(type => type.value === props.values.discountType)}
                                    onChange={val => props.setFieldValue('discountType', val.value)}
                                />
                            </Form.Group>
                            <Form.Group label={t('start-date')}>
                                <StyledDatePicker
                                    className="form-control"
                                    onChange={date => props.setFieldValue('startDate', date)}
                                    value={props.values.startDate ? new Date(props.values.startDate) : null}
                                    disableClock
                                    format="dd/MM/yyyy HH:mm:ss"
                                    clearIcon={<Icon name="x" />}
                                    calendarIcon={<Icon name="calendar" />}
                                    locale={getLanguage()}
                                    renderNumbers
                                    name="startDate"
                                />
                            </Form.Group>
                            <Form.Group label={t('end-date')}>
                                <StyledDatePicker
                                    className="form-control"
                                    onChange={date => props.setFieldValue('endDate', date)}
                                    value={props.values.endDate ? new Date(props.values.endDate) : null}
                                    disableClock
                                    format="dd/MM/yyyy HH:mm:ss"
                                    clearIcon={<Icon name="x" />}
                                    calendarIcon={<Icon name="calendar" />}
                                    locale={getLanguage()}
                                    renderNumbers
                                    name="endDate"
                                />
                            </Form.Group>
                            <FormField
                                name="value"
                                label={t('discount-value')}
                                placeholder={t('discount-value')}
                                type="number"
                            />
                            <FormField
                                name="minOrderValue"
                                label={t('min-order-value')}
                                placeholder={t('min-order-value')}
                                type="number"
                            />
                        </Form>
                    </BaseModal>
                )
            }}
        />
    )
}

export default withCurrentShop(DiscountModal)
