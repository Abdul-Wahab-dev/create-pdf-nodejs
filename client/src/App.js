import React from "react";

import "./App.css";

function App() {
  const downloadFile = () => {
    fetch("/api/v1/report")
      .then((res) => res.blob())
      .then((bytes) => {
        let elm = document.createElement("a");
        elm.href = URL.createObjectURL(bytes);
        elm.setAttribute("download", "invoice.pdf");
        elm.click();
        elm.remove();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <p>
        You can download the file.Every Time you click on the Download Report ,
        report will generate with data store in database
      </p>
      <button className="btn btn-primary" onClick={downloadFile}>
        Download Report
      </button>
    </div>
  );
}

export default App;
