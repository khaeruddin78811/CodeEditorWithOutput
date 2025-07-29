
import { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import OutputViewer from "./components/OutputViewer";
import DownloadButton from "./components/DownloadButton";

function App() {
  const [code, setCode] = useState({
    html: "<h1>Hello TikTok!</h1>",
    css: "h1 { color: blue; text-align: center; }",
    js: "console.log('Welcome to TikTok!');",
    python: "print('Hello from Python!')"
  });
  const [language, setLanguage] = useState("html");

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/2 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Code Editor</h2>
        <select
          className="mb-4 p-2 border rounded"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
        <CodeEditor code={code} setCode={setCode} language={language} />
        <div className="mt-4">
          <DownloadButton type="image" outputElement={document.getElementById("output-iframe")} />
          <DownloadButton type="video" outputElement={document.getElementById("output-iframe")} />
        </div>
      </div>
      <div className="w-1/2 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Output</h2>
        <OutputViewer code={code} language={language} />
      </div>
    </div>
  );
}

export default App;
