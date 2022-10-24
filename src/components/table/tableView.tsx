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
}
export default function TableView(props: Props) {
  const { invoices, getClient } = props;
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
        {/* <tr>
          <td data-label="Consola">Play Station 3</td>
          <td data-label="Precio">$8000</td>
          <td data-label="Ventas">800000</td>
          <td data-label="Fecha de lanzamiento">10/01/2012</td>
          <td data-label="Discount">10%</td>
          <td data-label="Total">100</td>
        </tr>
        <tr>
          <td data-label="Consola">Play Station 3</td>
          <td data-label="Precio">$8000</td>
          <td data-label="Ventas">800000</td>
          <td data-label="Fecha de lanzamiento">10/01/2012</td>
          <td data-label="Discount">10%</td>
          <td data-label="Total">100</td>
        </tr>
        <tr>
          <td data-label="Consola">Play Station 3</td>
          <td data-label="Precio">$8000</td>
          <td data-label="Ventas">800000</td>
          <td data-label="Fecha de lanzamiento">10/01/2012</td>
          <td data-label="Discount">10%</td>
          <td data-label="Total">100</td>
        </tr> */}

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
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
