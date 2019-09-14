import React from 'react'
import styled from 'styled-components'
import { Alert } from 'tabler-react'
import { DAY_IN_MS } from '../../constants'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const StyledAlert = styled(Alert)`
    z-index: 9;
    width: 100%;
    top: 0;
    margin-bottom: 0 !important;
`

const getMsTimeInDays = msTime => new Date(msTime).getDate()
const AccountValidityWarning = ({ validityDate, isTrialPlan, validityError }) => {
    const { t } = useTranslation('billing-page')

    if (validityError)
        return (
            <StyledAlert type={'danger'}>
                <strong>{t('checking account validity failed')}</strong>
            </StyledAlert>
        )

    const accountValidity = validityDate
    if (!accountValidity) return null

    const planValidity = new Date(accountValidity)
    const now = new Date()

    let text = ''
    let alertType = 'warning'

    if (planValidity - now > DAY_IN_MS * 7) return null
    else if (now > planValidity && now - planValidity < DAY_IN_MS * 7) {
        const planValidityIn7 = planValidity
        planValidityIn7.setDate(planValidityIn7.getDate() + 7)
        alertType = 'danger'
        text = t(`You have`)
        text += ` ${getMsTimeInDays(planValidityIn7 - now)} `
        text += t('more days to pay invoice or your shop will be totaly closed')
    } else if (now > planValidity && now - planValidity >= DAY_IN_MS * 7) {
        alertType = 'danger'
        text = t('Closed shop notification')
    } else if (isTrialPlan) {
        alertType = 'warning'
        text = t(`Your testing period is about to finish in`)
        text += ` ${getMsTimeInDays(planValidity - now)} `
        text += `${t('days')}. `
        return (
            <StyledAlert type={alertType}>
                <strong>
                    {text}
                    <Link to="/billing/invoices">{t('Pay for invoice')}</Link>
                </strong>
            </StyledAlert>
        )
    } else {
        alertType = 'warning'
        text = t(`You have`)
        text += ` ${getMsTimeInDays(planValidity - now)} `
        text += t('more days to pay invoice for using administrator panel')
    }

    return (
        <StyledAlert type={alertType}>
            <strong>{text}</strong>
        </StyledAlert>
    )
}

export default AccountValidityWarning
