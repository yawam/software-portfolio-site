"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.bubble.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

interface RichTextPreviewProps {
  content?: string | null;
  className?: string;
}

export default function RichTextPreview({
  content,
  className,
}: RichTextPreviewProps) {
  const modules = useMemo(
    () => ({
      toolbar: false,
    }),
    [],
  );

  return (
    <div className={`rich-text-preview prose prose-sm prose-invert ${className ?? ""}`}>
      <ReactQuill
        value={content || ""}
        readOnly
        modules={modules}
        theme="bubble"
      />
    </div>
  );
}
