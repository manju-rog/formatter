import React, { useState, useEffect } from "react";
import xmlFormat from "xml-formatter";

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
        // Try to parse as JSON
        const json = JSON.parse(inputString);
        const prettyJSON = JSON.stringify(json, null, 2);
        setFormattedData(prettyJSON);
        setDataType("json");
        return;
      } catch (jsonErr) {
        console.log("JSON parsing failed:", jsonErr.message);
      }

      // Try to parse as XML
      if (isLikelyXML(inputString)) {
        try {
          // Use xml-formatter instead of prettier
          const prettyXML = xmlFormat(inputString, {
            indentation: "  ",
            lineSeparator: "\n",
            collapseContent: true,
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

  const getMessage = () => {
    if (dataType === "json") return "JSON found and beautified";
    if (dataType === "xml") return "XML found and beautified";
    if (dataType === "text") return "Text found";
    return "Output JSON/XML/Text";
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
        }}
      >
        {formattedData}
      </pre>
    </div>
  );
};

export default FormatData;
