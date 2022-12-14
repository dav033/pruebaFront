import { UseFormRegister } from "react-hook-form";
import "../../styles/newInvoice.scss";

import { AiOutlineClose } from "react-icons/ai";
import ProductsList from "../productsList";
import { motion, AnimatePresence } from "framer-motion";
import { Client } from "../../types";
import Spinner from "../spinner";

interface Props {
  close: () => void;
  products: {
    idProduct: number;
    productName: string;
    productPrice: string;
  }[];

  addProduct: () => void;
  register: UseFormRegister<{
    discount: number;
    clientId: number;
    date: Date;
  }>;

  clients: Client[];

  handleSubmit: any;

  onSubmit: (data: any) => void;

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

  loading: boolean;
}

export default function NewInvoice(props: Props) {
  const {
    close,
    products,
    addProduct,
    register,
    handleSubmit,
    clients,
    onSubmit,
    invoiceProducts,
    add,
    subtract,
    loading,
  } = props;

  return (
    <AnimatePresence>
      <div className="overlay">
        <motion.div
          className="newInvoiceModal"
          initial={{
            opacity: 0,
            scale: 0.75,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              ease: "easeOut",
              duration: 0.15,
            },
          }}
          exit={{
            opacity: 0,
            scale: 0.75,
            transition: {
              ease: "easeIn",
              duration: 0.5,
            },
          }}
        >
          <Spinner spinnerValue={loading} />
          <div className="modalHeader">New Invoice</div>
          <AiOutlineClose onClick={() => close()} className="closeButton" />

          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="section1">
              <div>
                <label>Discount</label>
                <input
                  {...register("discount")}
                  className="input"
                  id="discount"
                />
              </div>

              <div>
                <label>Date</label>
                <input
                  type="date"
                  className="input"
                  {...register("date")}
                  id="date"
                />
              </div>

              <div>
                <label>Client</label>
                <select
                  id="clientsSelect"
                  {...register("clientId")}
                  className="input"
                >
                  {clients.map((client) => {
                    return (
                      <option key={client.idClient} value={client.idClient}>
                        {client.ClientName}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="section2">
              <div className="inputsCont">
                <div>
                  <label>Products</label>
                  <div>
                    <select id="productsSelect">
                      {products.map((product) => {
                        return (
                          <option
                            key={product.idProduct}
                            value={product.idProduct}
                          >
                            {product.productName}
                          </option>
                        );
                      })}
                    </select>
                    <button type="button" onClick={() => addProduct()}>
                      Add
                    </button>
                  </div>
                </div>
              </div>
              <ProductsList
                invoiceProducts={invoiceProducts}
                add={add}
                subtract={subtract}
              />
            </div>

            <button className="submitButton" type="submit">
              Crear
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
