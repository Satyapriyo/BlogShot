import { useState } from "react";
import EditorSection from "../../components/EditorSection";
const NewWrite = (...props) => {
  const [data, setData] = useState("");
  return (
    <div className="bg-white text-black w-full flex items-center flex-col">
      <EditorSection className="w-full mx-auto text-black" />
    </div>
  );
};
export default NewWrite;
