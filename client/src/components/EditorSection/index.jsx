import { Editor } from "novel-lightweight";
import { useState, useEffect } from "react"; // Choose a theme, e.g., "github.css"
import CodeBlock from "@tiptap/extension-code-block";
import "./style.css";
const EditorSection = (props) => {
  const [data, setData] = useState("");
  return (
    <Editor
      initialValue={data}
      disableLocalStorage={true}
      immediatelyRender={false}
      defaultValue=""
      editable={false}
      onUpdate={(editor) => {
        props.setDesc(editor?.storage.markdown.getMarkdown());
      }}
      {...props}
    />
  );
};

export default EditorSection;
