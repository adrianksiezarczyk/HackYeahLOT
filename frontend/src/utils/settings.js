import { SHOP_INFO } from '../constants'

export const setShopInfo = value => {
    const shopInfoString = JSON.stringify(value)
    localStorage.setItem(SHOP_INFO, shopInfoString)
}

export const getShopInfo = () => {
    let shopInfo = localStorage.getItem(SHOP_INFO)
    return shopInfo ? JSON.parse(shopInfo) : {}
}

export const getShopId = () => {
    return getShopInfo().id
}

export const getShopDomain = () => {
    return getShopInfo().domain
}
