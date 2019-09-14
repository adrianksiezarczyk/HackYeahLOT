import Dinero from 'dinero.js'
import React from 'react'
import { Tooltip } from 'react-tippy'
import 'react-tippy/dist/tippy.css'
import styled from 'styled-components'
import { Card, Icon, Tag, Text } from 'tabler-react'
import { getLanguage } from '../../utils/l10n'

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
    top: 9.5rem;
    left: 1.5rem;
    background-color: #fde3d9 !important;
    color: #f97442 !important;
    .tag-addon {
        color: #fff;
        background-color: #fa7442;
    }
`

const ProductCardWrapper = styled(Card)`
    :hover {
        ${props => (props.enableGlobalEdit ? `background-color: #fafafa;` : ``)}
    }
    ${props => (props.enableGlobalEdit ? `cursor: pointer;` : ``)}
`

const Corner = styled.div`
    cursor: pointer;
    position: absolute;
    ${props => (props.checked ? `display: block;` : `display: none;`)}
    top: 0;
    left: 0;
    z-index: 11;
    border-style: solid;
    ${props =>
        props.checked
            ? `border-color: #82c853 transparent transparent transparent;`
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

const ProductLinkWrapper = styled.div``

const ProductCard = ({
    enableGlobalEdit,
    price,
    name,
    photo,
    orders,
    discountPercentage,
    rate,
    footer,
    id,
    checked,
    setEditList,
}) => {
    return (
        <ProductCardWrapper enableGlobalEdit={enableGlobalEdit}>
            <Card.Body>
                <ProductLinkWrapper
                    onClick={() => {
                        if (enableGlobalEdit)
                            setEditList(draft => {
                                const index = draft.indexOf(id)
                                if (index >= 0) draft.splice(index, 1)
                                else draft.push(id)
                            })
                    }}>
                    {enableGlobalEdit && (
                        <Tooltip title="Kliknij by dodać do listy edycji globalnej">
                            <Corner checked={checked}>
                                <Icon name="edit" />
                            </Corner>
                        </Tooltip>
                    )}

                    <div className="mb-4 text-center" style={{ minHeight: '150px' }}>
                        <img src={photo} alt={name} />
                        {discountPercentage && (
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
                    </div>
                    <Card.Title>{name}</Card.Title>
                    <div className="product-price">
                        <strong>
                            {Dinero({ amount: Math.round(price * 100), currency: 'usd' })
                                .setLocale(getLanguage())
                                .toFormat('$0,0.00')}
                        </strong>
                    </div>
                    <div>
                        <ProductFeatures>
                            <ProductFeature>
                                <div>
                                    <StyledIcon color="var(--yellow)" name="star" /> Rating:{' '}
                                </div>
                                <Text size="large" color="yellow">
                                    {(rate || 0).toFixed(2)}
                                </Text>
                            </ProductFeature>
                            <ProductFeature>
                                <div>
                                    <StyledIcon color="var(--primary)" name="check-square" /> Orders:
                                </div>
                                <span>{orders}</span>
                            </ProductFeature>
                        </ProductFeatures>
                    </div>
                </ProductLinkWrapper>
                {footer && <div className="mt-5 d-flex align-items-center">{footer(id)}</div>}
            </Card.Body>
        </ProductCardWrapper>
    )
}

export default ProductCard
