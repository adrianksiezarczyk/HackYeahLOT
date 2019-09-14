export interface DiscountModel{
    code: string;
    discountType: number;
    startDate: Date;
    endDate: Date;
    minOrderValue: number;
    value: number;
    leftQuantity: number
}
export interface GetDiscountModel{
    onlyAny:boolean
}