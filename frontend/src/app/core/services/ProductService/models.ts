export interface GetProductRequest {
    id?: number
    name?: string
    categoryId?: number
    minPrice?: number
    maxPrice?: number
    aliExpressOfferId: string
    aliExpressCategoryName: string
    dateStart?: Date
    dateEnd?: Date
    onlyNotAvailable: boolean
    onlyReady: boolean
    shopId: number
    notAddedToShop: boolean
    listMode: string
    aliExpressCategoryId?: number
    noShortDescription?: boolean
}
export interface GetShopProductRequest extends GetProductRequest {
    shopId: number
}

export interface ProductModel {
    id: number
    name: string
    aliExpressCategory: string
    avaliable: boolean
    maxPrice: number
    description: string
    photos: Array<ProductPhoto>
    checked: boolean
    commissionTypeId: number
    aliExpressOfferId: string
    additionalMargin?: number
}

export interface ProductPhoto {
    id: number
    imageUrl: string
    default: boolean
    productId: number
    isVisible: boolean
}

export interface AddProductToShopRequest {
    productId: number
    shopId: number
    categoryIdList: Array<number>
}

export interface ShopProductModel {
    productId: number
    name: string
    description: string
    category: string
    maxPrice: number
    commissionTypeId?: number
    price: number
    currencyMaxPrice: number
    photos: Array<ProductPhoto>
    feautures: Array<FeautureModel>
    categoryName: string
    available: boolean
    hasOpinion: boolean
    checked: boolean
}

export interface FeautureModel {
    id: number
    feautureTypeId: number
    isVisible: boolean
    value: string
    featureTypeName: string
}
export interface CategoryModel {
    id: number
    name: string
    description: string
    fullName: string
    displayName: string
    parentId?: number
    checked: boolean
    children: Array<CategoryModel>
}

export interface CombinationModel {
    id: number
    price: number
    quantity: number
    variants: string
    imageUrl: string
    combinationId: string
    currencyCode: string
}

export interface ShopProductDetailsModel {
    id: number
    commissionTypeId: number
    photos: Array<ProductPhoto>
    feautures: Array<FeautureModel>
    combinations: Array<CombinationModel>
    categoryIds: Array<number>
    ready: boolean
    available: boolean
    hasOpinion: boolean
    shortDescription: string
    aliExpressOffers: Array<AliExpressOffer>
    localizedDetails: Array<LocalizedProductDetails>
    additionalMargin?: number
}
export interface LocalizedProductDetails {
    name: string
    shortDescription: string
    fullDescription: string
    languageId: number
}

export interface AliExpressOffer {
    aliExpressId: string
    current: boolean
    new: boolean
}

export interface GetProductCombinationsRequest {
    productId: number
    combinationId: number
}

export interface ImportModel {
    productUrl
    productId
}
