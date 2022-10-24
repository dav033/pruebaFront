import { useEffect } from "react";

import { BsTrashFill } from "react-icons/bs";
import { GrAdd, GrSubtract } from "react-icons/gr";

interface Props {
  invoiceProducts: {
    product: {
      idProduct: number;
      productName: string;
      productPrice: string;
    };

    quantity: number;
  }[];
  add: (id: number) => void;
  subtract: (id: number) => void;
}

export default function ProductsList(props: Props) {
  const { invoiceProducts, add , subtract} = props;

  //   useEffect(() => {
  //     console.log("invoiceProducts");
  //   }, [invoiceProducts]);

  return (
    <div className="prueba" id="scroll">
      {invoiceProducts.map((item) => {
        return (
          <div key={item.product.idProduct}>
            <div style={{ display: "inline", width: "40%" }}>
              {item.product.productName}
            </div>
            <span>
              <GrSubtract className="operationIcon" onClick={() => {subtract(item.product.idProduct)}} />
              <b>{item.quantity}</b>
              <GrAdd
                className="operationIcon"
                onClick={() => add(item.product.idProduct)}
              />
            </span>
            <BsTrashFill />
          </div>
        );
      })}
    </div>
  );
}
