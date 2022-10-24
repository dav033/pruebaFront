import axios from "axios";
import { useEffect, useState } from "react";
import TableView from "./tableView";

export default function Table() {
  const [invoices, setInvoices] = useState<
    {
      clientId: string;
      date: string;
      discount: number;
      invoiceId: number;
      subtotal: number;
      total: number;
    }[]
  >([]);

  const [clients, setClients] = useState<
    {
      idClient: number;
      ClientName: string;
      contactPoint: string;
      PhoneNumber: string;
      Email: string;
    }[]
  >([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get("http://localhost:4000/invoices");

      const responseClients = await axios.get(`http://localhost:4000/clients`);

      setClients(responseClients.data);

      setInvoices(response.data);
    }

    getData();
  }, []);

  const getClient = (id: number) => {
    const client = clients.find((item) => item.idClient === id);
    console.log(clients)
    console.log(id)
    return client?.ClientName;
  };

  return <TableView invoices={invoices} getClient={getClient} />;
}
