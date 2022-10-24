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
