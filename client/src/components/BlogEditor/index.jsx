import { Editor } from "novel-lightweight";
import { useState } from "react"; // Choose a theme, e.g., "github.css"

// import "./style.css";
const EditorSection = (props) => {
  console.log(props);
  const [data, setData] = useState(props.initialData || "");
  return (
    <Editor
      
      disableLocalStorage={true}
      immediatelyRender={false}
      defaultValue={data}
      editable={false}
      onUpdate={(editor) => {
        setData(editor?.storage.markdown.getMarkdown());
      }}
      {...props}
    />
  );
};

export default EditorSection;
