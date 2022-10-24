import React, { useEffect, useState } from "react";
import Table from "./components/table/table";

import "./styles/global.css";
import "./styles/app.scss";
import { useShow } from "./hooks/useShow";
import NewInvoice from "./components/newInvoice/newInvoice";
import axios from "axios";
import { Client, Invoice } from "./types";
import InvoiceDetails from "./components/invoiceDetail";
import { idText } from "typescript";
import Navbar from "./components/navbar";
import "./styles/newInvoice.scss";
import dotenv from "dotenv";
import { set } from "react-hook-form";

function App() {
  const { show, close, open } = useShow();

  const {
    show: showInvoiceDt,
    close: closeInvoiceDt,
    open: openInvoiceDt,
  } = useShow();

  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const [clients, setClients] = useState<Client[]>([]);

  const [data, setData] = useState<any>(null);

  const [products, setProducts] = useState<any>([]);

  const [updateData, setUpdateData] = useState<boolean>(false);

  const handleUpdateData = () => {
    if (updateData) {
      setUpdateData(false);
    } else {
      setUpdateData(true);
    }
  };

  useEffect(() => {
    async function getData() {
      const response = await axios.get(`${process.env.REACT_APP_HOST}invoices`);

      const responseClients = await axios.get(
        `${process.env.REACT_APP_HOST}clients`
      );

      const responseProducts = await axios.get(
        `${process.env.REACT_APP_HOST}products`
      );

      setClients(responseClients.data);

      setInvoices(response.data);

      setProducts(responseProducts.data);
    }

    if(!updateData){
      getData()
    }

    getData();
  }, [updateData]);

  const openDetails = (info: any) => {
    setData(info);

    openInvoiceDt();
  };

  const getClient = (id: number) => {
    const client = clients.find((item) => item.idClient === id);
    console.log(clients);
    console.log(id);
    return client?.ClientName;
  };

  useEffect(() => {
    const app = document.getElementById("app");
    const over = document.getElementById("owo");

    if (show || showInvoiceDt) {
      if (app) app.style.overflow = "hidden";
      if (over) over.style.display = "none";
    } else {
      if (app) app.style.overflow = "auto";
      if (over) over.style.display = "flex";
    }
  }, [show, showInvoiceDt]);

  return (
    <div className="App" id="app">
      <Navbar />
      <div>
        <button onClick={() => open()} type="button" className="newInvoice">
          New Invoice
        </button>
      </div>
      <NewInvoice
        show={show}
        close={close}
        handleUpdateData={handleUpdateData}
      />
      <Table invoices={invoices} getData={openDetails} getClient={getClient} />

      <InvoiceDetails
        show={showInvoiceDt}
        close={closeInvoiceDt}
        data={data}
        products={products}
      />
    </div>
  );
}

export default App;
