export interface AliExpressShopModel {
    id: number
    aliExpressId: number
    name: string
    isImported: boolean
}
export interface ShopModel {
    id: number
    name: string
    domain: string
}
export interface ImportShopModel {
    date: Date
    aliExpressId: number
    shopName: string
    categories: any
    domain: string
    finished: boolean
    error: string
    setId: number
    status: string
}
export interface GetShopsRequest {}
export interface GetImportsShopsRequest {}
