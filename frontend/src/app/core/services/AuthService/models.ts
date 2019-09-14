export interface LoginUserModel {
    email: string
    password: string
}

export interface RegisterUserModel {
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
    password: string
    shopName: string
    captchaToken: string
}

export interface TokenModel {
    email: string
    token: string
    expiryDate: Date
    role: string
    permissions: Array<string>
}

export interface ShopSetModel {
    id: number
    name: string
    accessToken: string
    shops: Array<ShopModel>
}

export interface ShopModel {
    id: number
    domain:string;
}
