import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { Grid, Card, Dimmer, Button } from 'tabler-react'
import Pagination from '../../components/shared/Pagination'
import OfferApi from '../../services/offer/api'
import { PrimaryButton } from '../../components/shared/Button'
import { withRouter } from 'react-router-dom'
import useImmerState from '../../hooks/useImmerState'
import LoadingIndicator from '../../components/shared/LoadingIndicator'
import { warningTakeAlert } from '../../components/shared/TakeAlert'

const StyledCardTitle = styled(Card.Title)`
    font-size: 24px;
`
const BuyShopContent = styled.p`
    font-size: 16px;
`
const ProductCard = styled(Card)``
const ProductCardImage = styled.div`
    height: 225px;
    margin-bottom: 1rem;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`
const ProductCardTitle = styled(Card.Title)`
    max-height: 45px;
    margin-bottom: 0.5rem !important;
`
const ProductCardSubtitle = styled.p`
    font-size: 16px !important;
    margin-bottom: 2.5rem !important;
    color: #9aa0ac;
`
const ProductCardPrice = styled.div`
    color: #646464;
    font-size: 24px;
    display: block;
    margin: -0.75rem 0 1rem;
    line-height: 1.1;
    font-weight: 500;
`
const ProductCardFooter = styled.div`
    display: flex;
    justify-content: space-between;
`
const StyledButton = styled(Button)`
    width: 90px;
`
const StyledPrimaryButton = styled(PrimaryButton)`
    width: 90px;
`

const BuyShop = ({ t, history }) => {
    const [shopsOffers, setShopsOffers] = useImmerState(null)
    const [totalItems, setTotalItems] = useState(null)
    const [isLoading, setLoading] = useState(null)

    const getShops = useCallback(
        async (currentPage = 1, pageSize = 12) => {
            setLoading(true)
            try {
                const response = await OfferApi.get({ pageSize, currentPage })
                setShopsOffers(() => response.data)
                setTotalItems(response.totalItems)
            } catch (e) {
                console.error(e)
            }
            setLoading(false)
        },
        [setShopsOffers],
    )

    useEffect(() => {
        getShops()
    }, [getShops])

    const errorAlert = () =>
        warningTakeAlert(t('You have not filled out the invoice details'), t('Return to the form'), t('Go'), () => {
            history.push('/billing/details')
        })

    const buyShop = async offerId => {
        setLoading(true)
        try {
            const response = await OfferApi.buyShop(offerId)
            window.location.href = response.redirectUri
        } catch (error) {
            console.error(error)
            errorAlert()
        }
        setLoading(false)
    }

    return (
        <Grid>
            <Grid.Row>
                <Grid.Col>
                    <Card>
                        <Card.Status color="blue" />
                        <Card.Header>
                            <StyledCardTitle>{t('buy ready shop')}</StyledCardTitle>
                        </Card.Header>
                        <Card.Body>
                            <BuyShopContent>{t('buy shop content')}</BuyShopContent>
                        </Card.Body>
                    </Card>
                </Grid.Col>
            </Grid.Row>
            <Grid.Row>
                {!shopsOffers ? (
                    <LoadingIndicator />
                ) : (
                    <>
                        {shopsOffers.map(shopOffer => {
                            return (
                                <Grid.Col md={3} key={shopOffer.id}>
                                    <ProductCard>
                                        <Card.Body>
                                            <Dimmer loader active={isLoading}>
                                                <ProductCardImage>
                                                    <img
                                                        src={`https://takeshop.ams3.cdn.digitaloceanspaces.com/${shopOffer.photoUrl}_.webp`}
                                                        alt=""
                                                    />
                                                </ProductCardImage>
                                                <ProductCardTitle>
                                                    {shopOffer.tags.map((tag, index) => {
                                                        if (index < shopOffer.tags.length - 1)
                                                            return <span key={index}>{tag}, </span>
                                                        return <span key={index}>{tag} </span>
                                                    })}
                                                </ProductCardTitle>
                                                <ProductCardSubtitle>
                                                    {shopOffer.productsCount} {t('products_genitive')}
                                                </ProductCardSubtitle>
                                                <ProductCardPrice>{shopOffer.price} zł</ProductCardPrice>
                                                <ProductCardFooter>
                                                    <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href={`//${shopOffer.domain}`}>
                                                        <StyledButton color="secondary" size={'md'}>
                                                            {t('See')}
                                                        </StyledButton>
                                                    </a>
                                                    <StyledPrimaryButton
                                                        text={t('Buy shop')}
                                                        size="md"
                                                        onClick={() => buyShop(shopOffer.id)}
                                                    />
                                                </ProductCardFooter>
                                            </Dimmer>
                                        </Card.Body>
                                    </ProductCard>
                                </Grid.Col>
                            )
                        })}
                    </>
                )}
            </Grid.Row>
            <Pagination totalItems={totalItems} onPageChange={getShops} />
        </Grid>
    )
}

export default withRouter(BuyShop)
