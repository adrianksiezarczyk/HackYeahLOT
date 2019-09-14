import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import BaseModal from '../../components/shared/BaseModal'
import LoadingIndicator from '../../components/shared/LoadingIndicator'

const Content = styled.div`
    height: 150px;
    h2 {
        text-align: center;
    }
    .dimmer {
        position: static !important;
    }
`

const CreatingShopModal = ({ isOpen }) => {
    const [t] = useTranslation('login-register')

    return (
        <BaseModal size="md" isOpen={isOpen}>
            <Content>
                <h2>{t('Creating your shop')}...</h2>
                <LoadingIndicator />
            </Content>
        </BaseModal>
    )
}

export default CreatingShopModal
