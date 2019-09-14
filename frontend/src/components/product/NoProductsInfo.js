import React from 'react'
import { Grid } from 'tabler-react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const NoProductsInfo = styled.div`
    width: 100%;
    text-align: center;
    font-size: 20px;
    margin-top: 50px;
`

export default () => {
    const [t] = useTranslation('products-page')
    return (
        <Grid.Row>
            <NoProductsInfo>{t('No products to show')}</NoProductsInfo>
        </Grid.Row>
    )
}
