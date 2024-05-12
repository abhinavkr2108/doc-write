"use client";
import { useDocumentStore, useSingleDocumentStore } from "@/lib/store";
import { Button, Container, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaTrashAlt } from "react-icons/fa";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export default function MyDocuments() {
  const documents = useDocumentStore((state) => state.documents);
  const setId = useSingleDocumentStore((state) => state.setId);
  const setFilename = useSingleDocumentStore((state) => state.setFileName);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = () => {
    console.log("delete");
  };
  const deleteDocument = async (id: string) => {};

  const navigateToEditPage = (id: string, fileName: string) => {
    router.push(`/create/${id}`);
    setId(id);
    setFilename(fileName);
    console.log("navigateToEditPage: ", id);
    console.log("navigateToEditPage: ", fileName);
  };

  return (
    <Container maxW={"5xl"} mx={"auto"}>
      <div>
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl py-6">
          My Documents
        </h3>
      </div>
      <div className="shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Document Name</th>
              <th className="py-3 px-6">Created At</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {documents.map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{item.fileName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.createdAt.toDate().toLocaleString() || ""}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    colorScheme="blue"
                    variant={"outline"}
                    mr={4}
                    onClick={() => navigateToEditPage(item.id, item.fileName)}
                  >
                    View
                  </Button>
                  <Button
                    leftIcon={<FaTrashAlt />}
                    colorScheme="red"
                    onClick={onOpen}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Document</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to delete this document? Deleted documents
              cannot be recovered.
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Delete
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </Container>
  );
}
