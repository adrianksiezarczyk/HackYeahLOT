import React from 'react'
import styled from 'styled-components'
import { Icon } from 'tabler-react'

const TakeDropHeadersBox = styled.div`
    width: 240px;
    background-color: #f5f5f5;
    color: rgb(58, 57, 57);
    border: 1px solid rgba(0, 40, 100, 0.12);
`
const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    height: 36px;
    background-color: ${props => props.headerBackgroundColor};
    font-size: 15px !important;
    .flag {
        height: 10px !important;
        margin-right: 3px;
    }
    i {
        color: rgb(153, 153, 153);
        margin-left: 3px;
    }
`
const StyledSecondHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    height: 55px;
    background-color: #fff;
    border-bottom: 1px solid ${props => props.borderColor};
`
const HamburgerMenu = styled.div`
    display: inline-block;
    position: relative;
    span {
        display: block;
        width: 30px;
        height: 3px;
        margin-bottom: 5px;
        position: relative;
        background: #969595;
        border-radius: 3px;
    }
    &:after {
        content: '';
        position: absolute;
        top: -4px;
        right: -7px;
        width: 12px;
        height: 12px;
        background-color: ${props => props.primaryColor};
        border-radius: 50%;
    }
`
const CartIcon = styled.div`
    position: relative;
    height: 34px;
    width: 34px;
    padding: 6px;
    border: 1px solid rgb(225, 225, 225);
    border-radius: 2px;
    &:after {
        content: ' 0';
        padding: 4px;
        width: 20px;
        height: 20px;
        right: -10px;
        top: 6px;
        font-size: 15px;
        line-height: 11px;
        position: absolute;
        display: inline-block;
        color: rgb(255, 255, 255);
        background-color: ${props => props.primaryColor};
    }
`
const Dropdowns = styled.div`
    display: flex;
`
const Dropdown = styled.div`
    display: flex;
    align-items: center;
    color: rgb(153, 153, 153);
    margin-right: 5px;
`
const Text = styled.span`
    font-size: 15px;
`
const Container = styled.div`
    padding-right: 15px;
    padding-left: 15px;
    padding-bottom:15px;
    margin-right: auto;
    margin-left: auto;
`
const Breadcrumb = styled.div`
    padding: 0.75rem 0;
`
const Content = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
    padding: 1.25rem;
`
const Product = styled.div`
    position: relative;
`
const ProductPhoto = styled.div`
    display: inline-block;
`
const HeartIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    opacity: 1;
    right: -13px;
    top: -16px;
    color: #e62e04;
    background-color: rgb(255, 255, 255);
    width: 35px;
    height: 35px;
    box-shadow: rgba(0, 0, 0, 0.26) 0px 2px 5px 0px;
    z-index: 10;
    border-radius: 100px;
    i {
        font-size: 21px;
    }
`
const GallerySlider = styled.div`
    display: flex;
    padding-top: 5px;
`
const Thumbnail = styled.div`
    border-width: 2px;
    border-style: solid;
    border-color: #fff;
    &:first-child {
        border-color: ${props => props.secondaryColor};
    }
`
const ProductDetails = styled.div`
    margin-top: 15px;
`
const ProductName = styled.h1`
    font-size: 16px !important;
`
const ProductPriceRate = styled.div`
    display: flex;
`
const ProductPrices = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-basis: 70%;
`
const OldPrice = styled.span`
    font-size: 12px;
    text-decoration: line-through;
`
const CurrentPrice = styled.h2`
    font-weight: bolder;
    font-size: 16px;
`
const Discount = styled.div`
    margin-left: 5px;
    border-radius: 5px;
    position: relative;
    display: inline-block;
    z-index: 2;
    height: 15px;
    width: 30px;
    background-color: ${props => props.dangerColor};
    text-align: center;
    color: rgb(255, 255, 255);
    font-size: 11px;
    font-weight: 400;
    box-shadow: rgba(150, 150, 150, 0.3) 0px 3px 8px, rgba(150, 150, 150, 0.22) 0px 2px 4px;
`
const ProductRating = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    flex-basis: 30%;
`
const Stars = styled.div`
    i {
        font-size: 12px;
        color: #fac315;
    }
`
const Orders = styled.span`
    text-align: right;
    font-size: 12px;
`
const AddToCartContent = styled.div`
    background-color: rgb(245, 245, 245);
    margin-left: -15px;
    margin-right: -15px;
    padding: 15px 20px;
`
const Highlights = styled.div``
const HighlightBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px;
    max-height: 50px;
    background-color: #fff;
`
const HighlightText = styled.span`
    font-size: 10px;
    font-weight: lighter;
    padding: 7px;
    > span {
        color: ${props => props.secondaryColor};
        font-weight: bolder;
    }
    i {
        margin-right: 5px;
        color: rgb(0, 0, 0, 0.2);
    }
`
const DotsRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    span {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        margin: 0 4px;
        background: #000;
        opacity: 0.2;
        :last-child {
            background: ${props => props.secondaryColor};
            opacity: 1;
        }
    }
`
const ProductVariants = styled.div`
    font-size: 10px;
    text-transform: uppercase;
`
const VariantText = styled.div`
    font-weight: lighter;
    margin-top: 5px;
    margin-bottom: 5px;
`
const VariantBox = styled.div`
    color: rgb(204, 204, 204);
    background-color: #fff;
    border: 2px solid ${props => props.secondaryColor};
    padding: 5px;
`
const AddToCartButton = styled.div`
    text-transform: uppercase;
    color: white;
    background: ${props => props.primaryColor};
    text-align: center;
    padding: 3px 10px;
    font-size: 12px;
`

const gallery = [
    'https://images.take.shop/image/HTB18dN8czfguuRjSszcq6zb7FXap.jpg_50x50.jpg',
    'https://images.take.shop/image/HTB1pI3aHMaTBuNjSszfq6xgfpXa9.jpg_50x50.jpg',
    'https://images.take.shop/image/HTB1CURPH1uSBuNjSsziq6zq8pXav.jpg_50x50.jpg',
    'https://images.take.shop/image/HTB1Z7NBH49YBuNjy0Ffq6xIsVXaW.jpg_50x50.jpg',
    'https://images.take.shop/image/HTB1Pv8fHYGYBuNjy0Foq6AiBFXad.jpg_50x50.jpg',
]

const PhoneView = ({ getThemeValue }) => {
    return (
        <TakeDropHeadersBox>
            <StyledHeader headerBackgroundColor={getThemeValue('HeaderBackgroundColor')}>
                <Dropdowns>
                    <Dropdown>
                        <Text>Polski</Text>
                        <Icon name="chevron-down" />
                    </Dropdown>
                    <Dropdown>
                        <Icon prefix="flag" name="pl" />
                        <Text>PLN</Text>
                        <Icon name="chevron-down" />
                    </Dropdown>
                </Dropdowns>
                <div>
                    <Icon name="help-circle" />
                    <Icon name="user" />
                </div>
            </StyledHeader>
            <StyledSecondHeader borderColor={getThemeValue('BorderColor')}>
                <HamburgerMenu primaryColor={getThemeValue('PrimaryColor')}>
                    <span />
                    <span />
                    <span />
                </HamburgerMenu>
                <CartIcon primaryColor={getThemeValue('PrimaryColor')}>
                    <Icon name="shopping-cart" />
                </CartIcon>
            </StyledSecondHeader>
            <Container>
                <Breadcrumb>
                    <Icon name="home" /> / Telefony i akcesoria
                </Breadcrumb>
                <Content>
                    <Product>
                        <ProductPhoto>
                            <img src="https://images.take.shop/image/HTB18dN8czfguuRjSszcq6zb7FXap.jpg" alt="product" />
                        </ProductPhoto>
                        <GallerySlider>
                            {gallery.map((url, index) => {
                                return (
                                    <Thumbnail key={index} secondaryColor={getThemeValue('SecondaryColor')}>
                                        <img src={url} alt="" />
                                    </Thumbnail>
                                )
                            })}
                        </GallerySlider>
                        <ProductDetails>
                            <ProductName>Ochrona ekranu szkło</ProductName>
                            <ProductPriceRate>
                                <ProductPrices>
                                    <OldPrice>26,99</OldPrice>
                                    <CurrentPrice>
                                        13,99 zł <Discount dangerColor={getThemeValue('DangerColor')}>-49%</Discount>
                                    </CurrentPrice>
                                </ProductPrices>
                                <ProductRating>
                                    <Stars>
                                        <Icon name="star" />
                                        <Icon name="star" />
                                        <Icon name="star" />
                                        <Icon name="star" />
                                        <Icon name="star" />
                                    </Stars>
                                    <Orders>68000 zamówień</Orders>
                                </ProductRating>
                            </ProductPriceRate>
                        </ProductDetails>
                        <AddToCartContent>
                            <Highlights>
                                <HighlightBox>
                                    <Icon name="credit-card" />
                                    <HighlightText secondaryColor={getThemeValue('SecondaryColor')}>
                                        <span>Gwarancja</span> 12 miesięcy
                                    </HighlightText>
                                </HighlightBox>
                                <DotsRow secondaryColor={getThemeValue('SecondaryColor')}>
                                    <span />
                                    <span />
                                    <span />
                                </DotsRow>
                            </Highlights>
                            <ProductVariants>
                                <VariantText>Kolor</VariantText>
                                <VariantBox secondaryColor={getThemeValue('SecondaryColor')}>Iphone 6</VariantBox>
                            </ProductVariants>
                            <ProductVariants>
                                <VariantText>Ilość</VariantText>
                            </ProductVariants>
                            <AddToCartButton primaryColor={getThemeValue('PrimaryColor')}>
                                Dodaj do koszyka
                            </AddToCartButton>
                        </AddToCartContent>
                        <HeartIcon>
                            <Icon name="heart" />
                        </HeartIcon>
                    </Product>
                </Content>
            </Container>
        </TakeDropHeadersBox>
    )
}

export default PhoneView
