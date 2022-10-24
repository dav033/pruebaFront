import { useEffect, useState } from "react";
import "../../styles/table.css";

interface Props {
  invoices: {
    clientId: string;
    date: string;
    discount: number;
    invoiceId: number;
    subtotal: number;
    total: number;
  }[];

  getClient: (id: number) => string | undefined;

  getData: (info: any) => void;
}
export default function TableView(props: Props) {
  const { invoices, getClient, getData } = props;

  // const [data, setData] = useState<any>(null);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Invoice Number</th>
          <th>Client</th>
          <th>Date</th>
          <th>Subtotal</th>
          <th>Discount</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => {
          return (
            <tr key={invoice.invoiceId}>
              <td data-label="Invoice Number" onClick={() => getData(invoice)}>
                {invoice.invoiceId}
              </td>
              <td data-label="Client">
                {getClient(parseInt(invoice.clientId))}
              </td>
              <td data-label="Date">{invoice.date}</td>
              <td data-label="Subtotal">{invoice.subtotal}</td>
              <td data-label="Discount">{invoice.discount}%</td>
              <td data-label="Total">{invoice.total}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
