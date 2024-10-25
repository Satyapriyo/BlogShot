import { Editor } from "novel-lightweight";
import { useState } from "react";
const EditorSection = (...props) => {
  const [data, setData] = useState("");
  console.log(data);
  return (
    <Editor
      initialValue={data}
      disableLocalStorage={true}
      immediatelyRender={true}
      readOnly={true}
      onUpdate={(editor) => {
        setData(editor?.storage.markdown.getMarkdown());
      }}
      {...props}
    />
  );
};

export default EditorSection;
