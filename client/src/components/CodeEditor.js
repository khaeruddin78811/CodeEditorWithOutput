
import Editor from "@monaco-editor/react";

function CodeEditor({ code, setCode, language }) {
  return (
    <Editor
      height="60vh"
      language={language}
      value={code[language]}
      onChange={(value) => setCode({ ...code, [language]: value })}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        autoIndent: true,
        formatOnPaste: true,
        suggestOnTriggerCharacters: true,
        wordWrap: "on"
      }}
    />
  );
}

export default CodeEditor;
