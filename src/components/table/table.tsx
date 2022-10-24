import "../../styles/table.scss";
import { AiFillInfoCircle } from "react-icons/ai";
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

export default function Table(props: Props) {
  const { invoices, getData, getClient } = props;
  return invoices.length > 0 ? (
    <table className="table">
      <thead>
        <tr>
          <th>Invoice Number</th>
          <th>Client</th>
          <th>Date</th>
          <th>Subtotal</th>
          <th>Discount</th>
          <th>Total</th>
          <th>Info</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => {
          return (
            <tr key={invoice.invoiceId}>
              <td data-label="Invoice Number">{invoice.invoiceId}</td>
              <td data-label="Client">
                {getClient(parseInt(invoice.clientId))}
              </td>
              <td data-label="Date">{invoice.date}</td>
              <td data-label="Subtotal">{invoice.subtotal}</td>
              <td data-label="Discount">{invoice.discount}%</td>
              <td data-label="Total">{invoice.total}</td>
              <td data-label="Info">
                <AiFillInfoCircle
                  style={{ fontSize: "20px", cursor: "pointer" }}
                  onClick={() => getData(invoice)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : null;
}
