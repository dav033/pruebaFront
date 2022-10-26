import axios from "axios";
import { Client, Invoice, Invoice_product, Product } from "./types";

export const getNewInvoiceData = async (args: {
  productsSetter: (data: Product[]) => void;
  clientsSetter: (data: Client[]) => void;
  invoicesSetter: (data: Invoice[]) => void;
}) => {
  const { productsSetter, clientsSetter, invoicesSetter } = args;
  const responseProducts = await axios.get(
    `${process.env.REACT_APP_HOST}products`
  );
  const responseClients = await axios.get(
    `${process.env.REACT_APP_HOST}clients`
  );

  const responseInvoices = await axios.get(
    `${process.env.REACT_APP_HOST}invoices`
  );

  if (responseProducts.status === 200) productsSetter(responseProducts.data);

  if (responseClients.status === 200) clientsSetter(responseClients.data);

  if (responseInvoices.status === 200) invoicesSetter(responseInvoices.data);
};

export const getInvoiceDetailsData = async (args: {
  data: Invoice | null;
  itemsSetter: (data: Invoice_product[]) => void;
}) => {
  const { data, itemsSetter } = args;

  if (data) {
    const response = await axios.get(
      `${process.env.REACT_APP_HOST}invoices/${data.invoiceId}`
    );

    itemsSetter(response.data);
  }
};
