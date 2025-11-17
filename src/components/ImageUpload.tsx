// components/ImageUpload.tsx
"use client";

import { UploadButton } from "@/components/uploadthingButtons";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import Image from "next/image";
import { useState } from "react";

// Upload helper that provides an instant avatar preview
export default function ImageUpload({
  onUpload,
  onUploadStart,
  onUploadComplete,
}: {
  onUpload: (url: string) => void;
  onUploadStart?: () => void;
  onUploadComplete?: () => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Preview Image */}
      {preview && (
        <Image
          src={preview}
          alt="Preview"
          className="h-32 w-32 rounded-full border object-cover shadow-md"
          width={128}
          height={128}
          unoptimized
        />
      )}

      {/* UploadThing Button */}
      <UploadButton
        endpoint="imageUploader"
        onUploadBegin={() => {
          onUploadStart?.();
        }}
        onClientUploadComplete={(res) => {
          if (res && res[0]) {
            const uploadedUrl = res[0].ufsUrl;
            setPreview(uploadedUrl); // ✅ Show image preview
            onUpload(uploadedUrl); // ✅ Send to parent form
          }
          onUploadComplete?.();
        }}
        onUploadError={(error: Error) => {
          alert(`Upload failed: ${error.message}`);
          onUploadComplete?.();
        }}
        appearance={{
          button:
            "ut-upload-button bg-sky-600 text-white hover:bg-sky-700 transition px-4 py-2 rounded-md",
        }}
      />
    </div>
  );
}
