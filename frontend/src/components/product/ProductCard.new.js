import Dinero from 'dinero.js'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Card, Icon, Tag, Text } from 'tabler-react'
import { getLanguage } from '../../utils/l10n'
import Tippy from '@tippy.js/react'
import { useTranslation } from 'react-i18next'
import { getPhotoUrl } from '../../utils/helpers/images'

const ProductCardWrapper = styled(Card)`
    :hover {
        ${props => (props.clickable ? `background-color: #fafafa;` : ``)}
    }
    ${props => (props.clickable ? `cursor: pointer;` : ``)}
`
const Photo = styled.div`
    min-height: 150px;
    position: relative;
    width: 100%;
    :after {
        content: '';
        display: block;
        padding-bottom: 100%;
    }
    img {
        position: absolute;
        object-fit: contain;
        max-height: 100%;
    }
`
const ProductFeatures = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 1em;
`
const ProductFeature = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

const StyledIcon = styled(Icon)`
    color: ${props => props.color};
`

const LineThroughText = styled(Text)`
    text-decoration: line-through;
`

const OldPriceTag = styled(Tag)`
    position: absolute;
    top: 1rem;
    left: 1rem;
    background-color: #fde3d9 !important;
    color: #f97442 !important;
    .tag-addon {
        color: #fff;
        background-color: #fa7442;
    }
`

const Corner = styled.div`
    cursor: pointer;
    position: absolute;
    ${props => (props.active ? `display: block;` : `display: none;`)}
    top: 0;
    left: 0;
    border-style: solid;
    ${props =>
        props.active
            ? `border-color: var(--success) transparent transparent transparent;`
            : `border-color: grey transparent transparent transparent;`}
    border-width: 50px 50px 0 0;

    i {
        position: absolute;
        height: 20px;
        width: 20px;
        margin-top: -48px;
        color: white;
        top: 0.2em;
        left: 0.3em;
        font-size: 1.2em;
    }

    ${ProductCardWrapper}:hover & {
        display: block;
    }
`

const CardBodyWrapper = styled.div`
    outline: none !important;
    :active,
    :hover,
    :focus {
        outline: none !important;
    }
`

const ProductCardTitle = styled(Card.Title)`
    overflow: hidden;
    line-height: 1;
    -webkit-line-clamp: 1;
    height: 3.6em;
    :after {
        content: '';
        text-align: right;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 70%;
        height: 1.2em;
    }
`

const ProductCard = ({
    type,
    name,
    price,
    currency,
    photo,
    orders,
    discountPercentage,
    rate,
    id,
    footer,
    clickable = false,
    showCorner = false,
    showTooltip = false,
    hideRating = false,
    hideOrders = false,
    ...props
}) => {
    const [t] = useTranslation('products-page')

    const handleOnClick = useCallback(() => {
        if (clickable && props.onClick && typeof props.onClick === 'function') {
            props.onClick(id)
        }
    }, [clickable, id, props])

    return (
        <ProductCardWrapper clickable={clickable}>
            <Tippy
                enabled={showTooltip}
                content={props.tooltipContent | ''}
                arrow={true}
                animation="scale"
                duration={100}
                delay={[50, 50]}>
                <CardBodyWrapper onClick={handleOnClick}>
                    <Card.Body>
                        {showCorner && (
                            <Corner active={props.cornerActive}>
                                <Icon name={props.cornerIcon} />
                            </Corner>
                        )}
                        <Photo className="mb-4">
                            <img src={getPhotoUrl({photo})} alt={name} />
                            {!!discountPercentage && (
                                <OldPriceTag addOn={<Text>{discountPercentage}% off</Text>}>
                                    <LineThroughText>
                                        {Dinero({
                                            amount: Math.round(((price * 100) / (100 - discountPercentage)) * 100),
                                            currency: 'usd',
                                        })
                                            .setLocale(getLanguage())
                                            .toFormat('$0,0.00')}
                                    </LineThroughText>
                                </OldPriceTag>
                            )}
                        </Photo>
                        <ProductCardTitle>{name}</ProductCardTitle>
                        <div className="product-price">
                            <strong>
                                {Dinero({ amount: Math.round(price * 100), currency: currency ? currency : 'usd' })
                                    .setLocale(getLanguage())
                                    .toFormat('$0,0.00')}
                            </strong>
                        </div>
                        <div>
                            <ProductFeatures>
                                {!hideRating && (
                                    <ProductFeature>
                                        <div>
                                            <StyledIcon color="var(--yellow)" name="star" /> {t('rating-colon')}
                                        </div>
                                        <Text size="large" color="yellow">
                                            {(rate || 0).toFixed(2)}
                                        </Text>
                                    </ProductFeature>
                                )}
                                {!hideOrders && (
                                    <ProductFeature>
                                        <div>
                                            <StyledIcon color="var(--primary)" name="check-square" />{' '}
                                            {t('orders-colon')}
                                        </div>
                                        <Text size="large" color="var(--primary)">
                                            {orders || 0}
                                        </Text>
                                    </ProductFeature>
                                )}
                            </ProductFeatures>
                        </div>
                    </Card.Body>
                </CardBodyWrapper>
            </Tippy>
            {footer && (
                <Card.Footer>
                    <div className="d-flex align-items-center">{footer(id)}</div>
                </Card.Footer>
            )}
        </ProductCardWrapper>
    )
}

export default ProductCard
