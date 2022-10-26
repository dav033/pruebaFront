export interface Invoice {
  clientId: string;
  date: string;
  discount: number;
  invoiceId: number;
  subtotal: number;
  total: number;
}

export interface Client {
  idClient: number;
  ClientName: string;
  contactPoint: string;
  PhoneNumber: string;
  Email: string;
}

export interface Product {
    idProduct: number;
    productName: string;
    productPrice: string;
    productDescription: string;
}

export interface Invoice_product {

    invoiceId:number
    productId:number
    quantity:number

}