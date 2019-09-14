import { object, string } from 'yup'

export const validationSchema = object().shape({
    invoiceType: string().required('Required field'),
    street: string().required('Required field'),
    postCode: string().required('Required field'),
    city: string().required('Required field'),
    countryCode: string().required('Required field'),
    companyName: string().when('invoiceType', {
        is: 'Company',
        then: string().required('Required field'),
        otherwise: string().nullable(),
    }),
    nip: string().when('invoiceType', {
        is: 'Company',
        then: string().required('Required field'),
        otherwise: string().nullable(),
    }),
})

export const getInitialValues = data => {
    const preparedData = {
        invoiceType: 'Company',
        countryCode: 'pl',
    }
    if (!data) return preparedData

    const initialData = {
        ...preparedData,
        ...Object.entries(data).reduce((prev, [key, value]) => {
            if (prev[key] && (!value || value === 'None')) return prev
            prev[key] = value && value !== 'None' ? value : ''
            return prev
        }, preparedData),
    }
    return initialData
}
