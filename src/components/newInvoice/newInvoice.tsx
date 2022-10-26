import axios from "axios";
import { useEffect, useState } from "react";
import NewInvoiceView from "./newInvoiceView";
import { useForm } from "react-hook-form";

import { Client, Product } from "../../types";

interface Props {
  show: boolean;
  close: () => void;
  handleUpdateData: () => void;
  clients: Client[];
  products: Product[];
}

interface Prods {
  product: Product;
  quantity: number;
}

interface Form {
  discount: number;
  clientId: number;
  date: Date;
}

export default function NewInvoice(props: Props) {
  const { show, close, handleUpdateData, clients, products } = props;

  const [invoiceProducts, setInvoiceProducts] = useState<Prods[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<Form>();

  const clear = () => {
    setInvoiceProducts([]);
    const discount = document.getElementById("discount") as HTMLInputElement;
    const date = document.getElementById("date") as HTMLInputElement;

    if (discount) discount.value = "";

    if (date) date.value = "";
  };

  useEffect(() => {
    clear();
  }, [show]);

  const addProduct = () => {
    const select = document.getElementById(
      "productsSelect"
    ) as HTMLSelectElement;

    const aux = invoiceProducts;

    const selectProduct = products.find(
      (product) => product.idProduct.toString() === select.value
    );

    const isProductIn = aux.find(
      (item) => item.product.idProduct.toString() === select.value
    );

    if (isProductIn) {
      const newArray = invoiceProducts.map((item) => {
        if (item.product.idProduct === isProductIn.product.idProduct) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        return item;
      });

      setInvoiceProducts(newArray);
    } else {
      if (selectProduct) {
        setInvoiceProducts([
          ...invoiceProducts,
          { product: selectProduct, quantity: 1 },
        ]);
      }
    }
  };

  useEffect(() => {
    const scroll = document.getElementById("scroll");

    if (scroll !== null) {
      scroll.scrollTop = scroll.scrollHeight;
    }
  }, [invoiceProducts]);

  const add = (id: number) => {
    const newArray = invoiceProducts.map((item) => {
      if (item.product.idProduct === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    });

    setInvoiceProducts(newArray);
  };

  const subtract = (id: number) => {
    let aux = true;
    const newArray = invoiceProducts.map((item) => {
      if (item.product.idProduct === id) {
        if (item.quantity < 2) {
          const newProducts: Prods[] = invoiceProducts.filter(
            (prod) => prod.product.idProduct !== id
          );

          setInvoiceProducts(newProducts);
          aux = false;
        } else {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
      }

      return item;
    });

    if (aux) {
      setInvoiceProducts(newArray);
    }
  };

  async function onSubmit(data: Form) {
    setLoading(true);
    handleUpdateData();
    const { discount, clientId, date } = data;

    let realDiscount;

    if (discount.toString() === "") {
      realDiscount = 0;
    } else {
      realDiscount = discount;
    }

    if (date.toString() === "" || invoiceProducts.length < 1) {
      if (date.toString() === "" && invoiceProducts.length > 0)
        alert("Add a date");

      if (invoiceProducts.length < 1 && date.toString() !== "")
        alert("Add any product");

      if (date.toString() === "" && invoiceProducts.length < 1) {
        alert("Complete all fields");
      }
    } else {
      let subtotal = 0;

      invoiceProducts.forEach((item) => {
        const ret = parseInt(item.product.productPrice) * item.quantity;

        subtotal += ret;
      });

      const total = subtotal - subtotal * (discount / 100);

      await axios.post("http://localhost:4000/invoices", {
        clientId,
        date,
        discount: realDiscount,
        total,
        subtotal,
        products: invoiceProducts,
      });
      handleUpdateData();

      close();
    }
    setLoading(false);
  }

  return show ? (
    <NewInvoiceView
      close={close}
      products={products}
      clients={clients}
      addProduct={addProduct}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      invoiceProducts={invoiceProducts}
      add={add}
      subtract={subtract}
      loading={loading}
    />
  ) : null;
}
