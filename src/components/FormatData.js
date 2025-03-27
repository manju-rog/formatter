import React, { useState, useEffect } from "react";
import prettier from "prettier/standalone";
import parserXml from "@prettier/plugin-xml";

const isLikelyXML = (str) => {
  return /^\s*<\w+[^>]*>/.test(str);
};

const FormatData = ({ inputString }) => {
  const [formattedData, setFormattedData] = useState("");
  const [dataType, setDataType] = useState("empty");

  useEffect(() => {
    const formatInput = async () => {
      if (!inputString.trim()) {
        setFormattedData("");
        setDataType("empty");
        return;
      }

      try {
        const json = JSON.parse(inputString);
        const prettyJSON = JSON.stringify(json, null, 2);
        setFormattedData(prettyJSON);
        setDataType("json");
        return;
      } catch (jsonErr) {
        console.log("JSON parsing failed:", jsonErr.message);
      }

      if (isLikelyXML(inputString)) {
        try {
          const prettyXML = await prettier.format(inputString, {
            parser: "xml",
            plugins: [parserXml],
          });
          setFormattedData(prettyXML);
          setDataType("xml");
          return;
        } catch (xmlErr) {
          console.log("XML parsing failed:", xmlErr.message);

          setFormattedData(inputString);
          setDataType("text");
        }
      } else {
        setFormattedData(inputString);
        setDataType("text");
      }
    };

    formatInput();
  }, [inputString]);

  const getColor = () => {
    if (dataType === "json") return "#1E90FF"; // blue
    if (dataType === "xml") return "#32CD32"; // green
    return "#000";
  };

  const getMessage = () => {
    if (dataType === "json") return "JSON found and beautified";
    if (dataType === "xml") return "XML found ";
    if (dataType === "text") return "Text found";
    return "Enter JSON/XML/Text";
  };

  return (
    <div>
      <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
        {getMessage()}
      </div>
      <pre
        style={{
          whiteSpace: "pre-wrap",
          backgroundColor: "#f7f7f7",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          fontFamily: "monospace",
          fontSize: "14px",
          color: getColor(),
        }}
      >
        {formattedData}
      </pre>
    </div>
  );
};

export default FormatData;
