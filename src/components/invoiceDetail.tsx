import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "../styles/invoiceDetails.scss";

interface Props {
  show: boolean;
  close: () => void;
  data: any;
  products: any;
}

export default function InvoiceDetails(props: Props) {
  const { show, close, data, products } = props;

  const [items, setItems] = useState<any>([]);

  console.log(data);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}invoices/${data.invoiceId}`
      );

      console.log(response.data);
      setItems(response.data);
    }

    getData();
  }, [data]);

  const getProductName = (id: number) => {
    const product = products.find((product: any) => id === product.idProduct);

    console.log(product.productName);

    return product.productName;
  };
  return show ? (
    <div className="overlay">
      <div className="invoiceDetails">
        <AiOutlineClose onClick={() => close()} className="closeButton" />
        <div className ="header"></div>

        <div>
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
              {items.map((item: any) => {
                return (
                  <tr>
                    <td data-label="Invoice Number">{item.invoiceId}</td>
                    <td data-label="Product ID">{item.productId}</td>
                    <td data-label="Product Name">
                      {" "}
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
