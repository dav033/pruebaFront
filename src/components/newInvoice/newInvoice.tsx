import axios from "axios";
import { useEffect, useRef, useState } from "react";
import NewInvoiceView from "./newInvoiceView";
import { useForm } from "react-hook-form";

interface Props {
  show: boolean;
  close: () => void;
}

interface Prods {
  product: {
    idProduct: number;
    productName: string;
    productPrice: string;
  };

  quantity: number;
}

interface Form {
  discount: number;
  clientId: number;
  date: Date;
}

export default function NewInvoice(props: Props) {
  const { show, close } = props;
  const [products, setProducts] = useState<
    {
      idProduct: number;
      productName: string;
      productPrice: string;
    }[]
  >([]);

  const [invoiceProducts, setInvoiceProducts] = useState<Prods[]>([]);
  const [clients, setClients] = useState([]);
  const { register, handleSubmit } = useForm<Form>();

  useEffect(() => {
    async function getData() {
      const responseProducts = await axios.get(
        `${process.env.REACT_APP_HOST}products`
      );
      const responseClients = await axios.get(
        `${process.env.REACT_APP_HOST}clients`
      );

      setProducts(responseProducts.data);
      setClients(responseClients.data);
    }

    getData();
  }, []);

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
      const index = aux.indexOf(isProductIn);

      aux[index].quantity = aux[index].quantity + 1;

      console.log("owo");
      const newArray = invoiceProducts.map((item) => {
        if (item.product.idProduct === isProductIn.product.idProduct) {
          return {
            ...item,
            quantity: item.quantity++,
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

    console.log(newArray);
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

          console.log(newProducts);

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
    const { discount, clientId, date } = data;

    console.log(date);

    if (date.toString() === "" || invoiceProducts.length < 1) {
      if (date.toString() === "" && invoiceProducts.length > 0)
        alert("Add a date");

      if (invoiceProducts.length < 1 && date.toString() !== "")
        alert("Add any product");

      if (date.toString() === "" && invoiceProducts.length < 1) {
        alert("Complete all fields");
      }
    } else {
      //const date = new Date(ml).toDateString();

      let subtotal = 0;

      invoiceProducts.forEach((item) => {
        const ret = parseInt(item.product.productPrice) * item.quantity;

        subtotal += ret;
      });

      const total = subtotal - subtotal * (discount / 100);

      console.log({
        date,
        subtotal,
        discount,
        total,
        clientId,
        invoiceProducts,
      });

      await axios.post("http://localhost:4000/invoices", {
        clientId,
        date,
        discount,
        total,
        subtotal,
        products: invoiceProducts,
      });

      close();
    }
  }

  useEffect(() => {
    console.log(show);
  }, [show]);

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
    />
  ) : null;
}
