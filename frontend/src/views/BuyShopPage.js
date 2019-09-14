import React from 'react'
import { Page } from 'tabler-react'
import BuyShop from './buyShopPage/BuyShop'
import { useTranslation } from 'react-i18next'

const BuyShopPage = () => {
    const [t] = useTranslation('buy-shop-page')
    return (
        <Page.Content>
            <BuyShop t={t} />
        </Page.Content>
    )
}
export default BuyShopPage
