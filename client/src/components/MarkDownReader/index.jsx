import React from "react";
import  ReactMarkdown  from "react-markdown";
const MarkdownReader = ({ markdown }) => {
  return <ReactMarkdown>{markdown}</ReactMarkdown>;
};

export default MarkdownReader;
