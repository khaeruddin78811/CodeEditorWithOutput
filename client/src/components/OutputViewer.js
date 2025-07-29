import { useState, useEffect } from "react";
import axios from "axios";

function OutputViewer({ code, language }) {
  const [pythonOutput, setPythonOutput] = useState("");

  useEffect(() => {
    if (language === "python") {
      async function runPython() {
        const pyodide = await window.loadPyodide();
        try {
          const output = await pyodide.runPythonAsync(code.python);
          setPythonOutput(output || "No output");
        } catch (error) {
          setPythonOutput(`Error: ${error.message}`);
        }
      }
      runPython();
    }
  }, [code.python, language]);

  if (language === "python") {
    return (
      <pre className="bg-gray-800 text-white p-4 rounded" id="output-iframe">
        {pythonOutput}
      </pre>
    );
  }

  return (
    <iframe
      id="output-iframe"
      title="output"
      style={{ width: "100%", height: "60vh", border: "1px solid #ccc" }}
      srcDoc={`${code.html}<style>${code.css}</style><script>${code.js}</script>`}
    />
  );
}

export default OutputViewer;
