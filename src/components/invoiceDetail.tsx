import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { getInvoiceDetailsData } from "../helpers";
import { useMounted } from "../hooks/useMounted";
import "../styles/invoiceDetails.scss";
import { Invoice, Invoice_product, Product } from "../types";

interface Props {
  show: boolean;
  close: () => void;
  data: Invoice | null;
  products: Product[];
}

export default function InvoiceDetails(props: Props) {
  const { show, close, data, products } = props;

  const [items, setItems] = useState<Invoice_product[]>([]);

  const itemsSetter = (data: Invoice_product[]) => setItems(data);

  useEffect(() => {
    getInvoiceDetailsData({ data, itemsSetter });
  }, [data]);

  const getProductName = (id: number) => {
    const product = products.find((product: any) => id === product.idProduct);

    if (product) return product.productName;
  };

  const { hasMounted } = useMounted();
  return show && data && hasMounted ? (
    <div className="overlay">
      <div className="invoiceDetails">
        <AiOutlineClose onClick={() => close()} className="closeButton" />
        <div className="header"></div>

        <div className="tableContainer">
          <table className="table">
            <thead>
              <tr>
                <th>Invoice Number</th>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                return (
                  <tr key={item.invoiceId}>
                    <td data-label="Invoice Number">{item.invoiceId}</td>
                    <td data-label="Product ID">{item.productId}</td>
                    <td data-label="Product Name">
                      {getProductName(item.productId)}
                    </td>
                    <td data-label="Quantity"> {item.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : null;
}
