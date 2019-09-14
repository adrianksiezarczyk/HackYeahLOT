export interface CategoryModel {
    name: string;
    productPrefix: string;
    hasChildren: boolean
    id: number
    parentId?: number
    localizedCategoryDetails: any
    parentCategoryId?: number
}
export interface SaveShopCategory {
    id?: number
    name: string
    displayName: string
    parentId?: number
}

export interface GetCategoryRequest {
    shopId: number;
    parentId: number;
    name: string;
    prefix: string;
}

