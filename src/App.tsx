import React, { useEffect, useState } from "react";
import Table from "./components/table/table";

import "./styles/global.css";
import "./styles/app.scss";
import { useShow } from "./hooks/useShow";
import NewInvoice from "./components/newInvoice/newInvoice";
import { Client, Invoice, Product } from "./types";
import InvoiceDetails from "./components/invoiceDetail";
import Navbar from "./components/navbar";
import "./styles/newInvoice.scss";
import { getNewInvoiceData } from "./helpers";

function App() {
  const { show, close, open } = useShow();

  const {
    show: showInvoiceDt,
    close: closeInvoiceDt,
    open: openInvoiceDt,
  } = useShow();

  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const [clients, setClients] = useState<Client[]>([]);

  const [data, setData] = useState<Invoice | null>(null);

  const [products, setProducts] = useState<any>([]);

  const [updateData, setUpdateData] = useState<boolean>(false);

  const handleUpdateData = () => {
    if (updateData) {
      setUpdateData(false);
    } else {
      setUpdateData(true);
    }
  };

  const invoicesSetter = (data: Invoice[]) => setInvoices(data);

  const clientsSetter = (data: Client[]) => setClients(data);

  const productsSetter = (data: Product[]) => setProducts(data);

  useEffect(() => {
    getNewInvoiceData({ productsSetter, clientsSetter, invoicesSetter });
  }, [updateData]);

  const openDetails = (info: Invoice) => {
    console.log(info)
    setData(info);
    openInvoiceDt();
  };

  const getClient = (id: number) => {
    const client = clients.find((item) => item.idClient === id);
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
          <b>New Invoice</b>
        </button>
      </div>
      <NewInvoice
        show={show}
        close={close}
        handleUpdateData={handleUpdateData}
        clients={clients}
        products={products}
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

export default React.memo(App);
