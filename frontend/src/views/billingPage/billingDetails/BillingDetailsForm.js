import React from 'react'
import styled from 'styled-components'
import { Form } from 'tabler-react'

const StyledFormRadio = styled(Form.Radio)`
    cursor: pointer;
`

const BillingDetailsForm = ({ formProps, t }) => {
    return (
        <>
            <Form.Group>
                <StyledFormRadio
                    isInline
                    name={'invoiceType'}
                    value="PersonalCapacity"
                    label={t('personal capacity')}
                    checked={formProps.values.invoiceType === 'PersonalCapacity'}
                    onChange={formProps.handleChange}
                />
                <StyledFormRadio
                    isInline
                    name={'invoiceType'}
                    value="Company"
                    label={t('company')}
                    checked={formProps.values.invoiceType === 'Company'}
                    onChange={formProps.handleChange}
                />
            </Form.Group>
            {formProps.values.invoiceType === 'Company' && (
                <>
                    <Form.Group label={t('company name')}>
                        <Form.Input
                            name="companyName"
                            type="text"
                            value={formProps.values.companyName}
                            onChange={formProps.handleChange}
                            error={formProps.errors.companyName}
                        />
                    </Form.Group>
                    <Form.Group label={'NIP'}>
                        <Form.Input
                            name="nip"
                            type="text"
                            value={formProps.values.nip}
                            onChange={formProps.handleChange}
                            error={formProps.errors.nip}
                        />
                    </Form.Group>
                </>
            )}
            {formProps.values.invoiceType === 'PersonalCapacity' && (
                <>
                    <Form.Group label={t('first name')}>
                        <Form.Input
                            name="firstName"
                            type="text"
                            value={formProps.values.firstName}
                            onChange={formProps.handleChange}
                            error={formProps.errors.firstName}
                        />
                    </Form.Group>
                    <Form.Group label={t('last name')}>
                        <Form.Input
                            name="lastName"
                            type="text"
                            value={formProps.values.lastName}
                            onChange={formProps.handleChange}
                            error={formProps.errors.lastName}
                        />
                    </Form.Group>
                </>
            )}
            <Form.Group label={t('street')}>
                <Form.Input
                    name="street"
                    type="text"
                    value={formProps.values.street}
                    onChange={formProps.handleChange}
                    error={formProps.errors.street}
                />
            </Form.Group>
            <Form.Group label={t('post code')}>
                <Form.Input
                    name="postCode"
                    type="text"
                    value={formProps.values.postCode}
                    onChange={formProps.handleChange}
                    error={formProps.errors.postCode}
                />
            </Form.Group>
            <Form.Group label={t('city')}>
                <Form.Input
                    name="city"
                    type="text"
                    value={formProps.values.city}
                    onChange={formProps.handleChange}
                    error={formProps.errors.city}
                />
            </Form.Group>
            <Form.Select name="countryCode" label={t('country')} onChange={formProps.handleChange}>
                <option value="pl">{t('Poland')}</option>
                <option value="uk">{t('United Kingdom')}</option>
            </Form.Select>
        </>
    )
}

export default BillingDetailsForm
