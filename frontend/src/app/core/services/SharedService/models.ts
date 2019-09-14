export enum SharedEventName {
    ShopChanged,
    CategorySelectionChanged,
    AccountValidChanged,
}
export interface SharedEventModel {
    name: SharedEventName
    data?: any
}
