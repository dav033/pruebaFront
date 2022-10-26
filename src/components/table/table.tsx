import "../../styles/table.scss";
import { Invoice } from "../../types";
import TableInfo from "../tableInfo";
interface Props {
  invoices: Invoice[];

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
          <th></th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => {
          return (
            <TableInfo
              key={invoice.invoiceId}
              invoice={invoice}
              getClient={getClient}
              getData={getData}
            />
          );
        })}
      </tbody>
    </table>
  ) : null;
}
