"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSingleDocumentStore } from "@/lib/store";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";

export default function EditDocumentPage() {
  const quillRef = useRef<Quill | null>(null);
  if (!quillRef.current) {
  }
  // Get HTML content

  useEffect(() => {
    if (!quillRef.current) {
      const quillServer = new Quill("#container", {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ["clean"],
          ],
        },
      });
    }
    if (quillRef.current) {
      const htmlContent = quillRef.current.root.innerHTML;
    }
  }, []);

  const filename = useSingleDocumentStore((state) => state.filename);
  console.log("EditDocumentPage: ", filename);

  return (
    <Box m={8}>
      <Flex>
        <Heading>{filename}</Heading>
        <Spacer />
        <Button colorScheme="blue">Save</Button>
      </Flex>
      <div id="container"></div>
    </Box>
  );
}
