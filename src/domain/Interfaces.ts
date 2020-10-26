export interface ILoginRequest {
    email: string;
    password: string;
}

export interface IRegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
    status: string;
    firstName: string;
    lastName: string;
}

export interface ICulture {
    code: string;
    name: string;
}

export interface IProduct {
    id: string;
    productTypeId: string;
    priceId: string;
    name: string;
    description: string;
    image: string;
}

export interface IProductType {
    id: string;
    name: string;
}

export interface IShoppingCart {
    id: string;
    appUserId: string;
}

export interface IProductInShoppingCart {
    id: string;
    shoppingCartId?: string;
    orderId?: string;
    productId: string;
    quantity: number;
    totalCost: number;
}

export interface IOrder {
    id: string;
    appUserId: string;
    shoppingCartId: string;
    orderNumber: number;
    date: string;
    totalCost: number;
}

export interface IPayment {
    id: string;
    paymentTypeId: string;
    appUserId: string;
    orderId: string;
    destinationId: string;
    date: string;
}

export interface IPaymentType {
    id: string;
    name: string;
}

export interface IDestination {
    id: string;
    location: string;
}

