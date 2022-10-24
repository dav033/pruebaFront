import React, { useEffect } from "react";
import Table from "./components/table/table";

import "./styles/global.css";

import "./styles/app.css";
import { useShow } from "./hooks/useShow";
import NewInvoice from "./components/newInvoice/newInvoice";
import { useMounted } from "./hooks/useMounted";

function App() {
  const { show, close, open } = useShow();

  const { hasMounted } = useMounted();
  useEffect(() => {
    console.log(show);
  }, [show]);

  return hasMounted ? (
    <div className="App">
      <div>
        <button onClick={() => open()} type="button" className="newInvoice">
          New Invoice
        </button>
      </div>
      <NewInvoice show={show} close={close} />
      <Table />
    </div>
  ) : null;
}

export default App;
