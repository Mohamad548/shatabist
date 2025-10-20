"use client";

import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = () => {
  const [content, setContent] = useState("");

  return (
    <div className="border p-4 rounded-md">
      <ReactQuill value={content} onChange={setContent} className="ql-editor" />
    </div>
  );
};

export default Editor;
