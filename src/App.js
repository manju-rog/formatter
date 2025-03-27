import React, { useState } from "react";
import FormatData from "./components/FormatData";

function App() {
  const [input, setInput] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <h3>Input String (JSON/XML/TXT)</h3>
      <textarea
        style={{ width: "100%", height: "200px" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste JSON, XML, or any text here..."
      />

      <h3>Formatted Output</h3>
      <FormatData inputString={input} />
    </div>
  );
}

export default App;
