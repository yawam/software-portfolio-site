"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

interface ProjectRichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProjectRichTextEditor({
  value,
  onChange,
}: ProjectRichTextEditorProps) {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        ["link", "blockquote", "code-block"],
        ["clean"],
      ],
    }),
    [],
  );

  const formats = useMemo(
    () => [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "list",
      "bullet",
      "color",
      "background",
      "link",
      "blockquote",
      "code-block",
    ],
    [],
  );

  return (
    <div className="rounded-xl bg-neutral-900/40">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}
