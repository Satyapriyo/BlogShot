import { Editor } from "novel-lightweight";
import { useState } from "react"; // Choose a theme, e.g., "github.css"

// import "./style.css";
const EditorSection = (props) => {
  const initialData = props.initialData;
  const [data, setData] = useState("");
  return (
    <Editor
      initialValue={data}
      disableLocalStorage={true}
      immediatelyRender={false}
      defaultValue="The new wave"
      editable={false}
      onUpdate={(editor) => {
        setData(editor?.storage.markdown.getMarkdown());
      }}
      {...props}
    />
  );
};

export default EditorSection;
