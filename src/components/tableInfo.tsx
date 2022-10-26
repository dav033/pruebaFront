import { AiFillInfoCircle } from "react-icons/ai";
import { Invoice } from "../types";
import '../styles/table.scss'

interface Props {
  invoice: Invoice;
  getClient: (id: number) => string | undefined;
  getData: (info: Invoice) => void;
}
export default function TableInfo(props: Props) {
  const { invoice, getClient, getData } = props;

  return (
    <tr key={invoice.invoiceId}>
      <td data-label="Invoice Number">{invoice.invoiceId}</td>
      <td data-label="Client">{getClient(parseInt(invoice.clientId))}</td>
      <td data-label="Date">{invoice.date}</td>
      <td data-label="Subtotal">{invoice.subtotal}</td>
      <td data-label="Discount">{invoice.discount}%</td>
      <td data-label="Total">{invoice.total}</td>
      <td data-label="Info">
        <AiFillInfoCircle
          style={{
            fontSize: "22px",
            cursor: "pointer",
            color: "#38649c",
          }}
          onClick={() => getData(invoice)}
        />
      </td>
    </tr>
  );
}
