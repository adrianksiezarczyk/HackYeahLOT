import { ShopProductModel } from "../ProductService/models";

export interface OrderFailModel{
    id: number;
    productId: number
    combinations: any
    loadingCombinations: Boolean
    orderId: number;
}
export interface GetOrderFailRequest{

}
export interface OrderModel {
    id: number;
    price: number;
    status: OrderStatusModel;
    date: Date;
    customerId: number;
    firstName: string;
    lastName: string;
    paymentUrl: string;
    products: Array<ShopProductModel>;
    checked: boolean;
}
export interface OrderStatusModel {
    name: string;
    displayName: string;
}
export interface GetOrdersRequest {
    id?: number;
    firstName: string;
    lastName: string;
    statusId?: number;
    date?: Date;
    minPrice?: number;
    maxPrice: number;
    baseLinkerOrderNumber: string;
    email: string;
    aliExpressOrderNumber: string;
    shopId: number;
    placingOrderDate: Date;
    orderDateFrom: Date;
    orderDateTo: Date;
}

export interface OrderDetailsModel {
    id: number;
    baseLinkerOrderNumber: string;
    amountPaid: number;
    products: Array<ProductOrderDetailsModel>;
    customer: CustomerOrderDetailsModel;
    status: StatusOrderDetailsModel;
    orderSum: number;
    aliExpressOrders: Array<AliExpressOrder>
}
export interface AliExpressOrder {
    number: string;
    products: Array<AliExpresOrderProduct>;
    checked: boolean;
    reSent: boolean;
}

export interface AliExpresOrderProduct {
    id: number;

}

export interface ProductOrderDetailsModel {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

export interface CustomerOrderDetailsModel {
    firstName: string;
    lastName: string
    phoneNumber: string;
    address: string;
    postCode: string;
    city: string;
    email: string;
}

export interface StatusOrderDetailsModel {
    id: number;
    name: string;
}