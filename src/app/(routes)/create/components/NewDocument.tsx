"use client";
import {
  Button,
  Card,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiDotsVertical } from "react-icons/bi";
import { TiDocumentAdd } from "react-icons/ti";
import { db } from "../../../../../firebase";
import {
  collection,
  addDoc,
  doc,
  FieldValue,
  Timestamp,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@chakra-ui/react";
import {
  useCollection,
  useCollectionOnce,
} from "react-firebase-hooks/firestore";
import { useStore } from "zustand";
import { nanoid } from "nanoid";
import {
  DocumentState,
  useDocumentStore,
  useSingleDocumentStore,
} from "@/lib/store";
import { useRouter } from "next/navigation";
import MyDocuments from "./MyDocuments";

type Document = {
  createdAt: Timestamp;
  fileName: string;
  id: string;
  docId: string;
};

export default function NewDocument() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  const [docName, setDocName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [documents, setDocuments] = useState<Document[]>([]);

  // useEffect(() => {
  //   const fetchDocuments = async () => {
  //     try {
  //       if (user) {
  //         const userEmail = user.primaryEmailAddress?.emailAddress;
  //         if (!userEmail) {
  //           console.error("userEmail is undefined");
  //           return []; // Or throw an error if you prefer
  //         }

  //         const userDocRef = doc(db, "userDocs", userEmail);
  //         const subcollectionRef = collection(userDocRef, "docs");

  //         const querySnapshot = await getDocs(subcollectionRef);
  //         querySnapshot.forEach((doc) => {
  //           console.log(doc.data());
  //           const data = doc.data() as Document;
  //           setDocuments((prevDocuments) => [...prevDocuments, data]);
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error fetching documents:", error);
  //       toast({
  //         title: "Error",
  //         description: "Failed to fetch documents",
  //         status: "error",
  //         duration: 5000,
  //         isClosable: true,
  //       });
  //     }
  //   };

  //   fetchDocuments();
  // }, [user, toast]);

  const fetchDocuments = useDocumentStore((state) => state.fetchDocuments);
  const setId = useSingleDocumentStore((state) => state.setId);
  const setFilename = useSingleDocumentStore((state) => state.setFileName);

  const [documentId, setDocumentId] = useState("");

  useEffect(() => {
    if (user) {
      fetchDocuments(toast, user?.primaryEmailAddress?.emailAddress as string);
    }
  }, [user, toast, fetchDocuments]);

  if (!user || !isLoaded || !isSignedIn) {
    return null;
  }

  const createDocument = async () => {
    const data = {
      fileName: docName,
      createdAt: Timestamp.fromDate(new Date()),
      id: nanoid(),
      docId: "",
    };
    const userEmail = user.primaryEmailAddress?.emailAddress;

    try {
      setLoading(true);

      // Check if userEmail is defined before using it
      if (userEmail) {
        const userDocRef = doc(db, "userDocs", userEmail);

        // Create a reference to the docs subcollection within the user document
        const subcollectionRef = collection(userDocRef, "docs");

        // Add the data as a new document within the docs subcollection
        const docRef = await addDoc(subcollectionRef, data);

        data.docId = docRef.id;

        const newDocuments: Document = {
          createdAt: data.createdAt,
          fileName: data.fileName,
          id: data.id,
          docId: docRef.id,
        };

        await updateDoc(docRef, { docId: docRef.id });
        setDocuments((prevDocuments) => [...prevDocuments, newDocuments]);

        toast({
          title: "Success",
          description: "Document created successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setId(data.id);
        setFilename(data.fileName);

        router.push(`/create/${data.id}`);
      } else {
        // Handle the case where userEmail is undefined (optional)
        console.error("userEmail is undefined");
        toast({
          title: "Error",
          description: "User email is missing",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create document",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-slate-50 w-full py-6">
        <Container maxW={"5xl"} mx={"auto"}>
          <Flex>
            <Text>Start a New Document</Text>
            <Spacer />
            <BiDotsVertical size={24} className="cursor-pointer" />
          </Flex>
          <Card
            className="h-52 w-40 flex items-center justify-center cursor-pointer mt-3"
            onClick={onOpen}
          >
            <TiDocumentAdd size={40} />
          </Card>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create your Document</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Document Name</FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder="Enter Your Document Name"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={createDocument}
                  isLoading={loading}
                >
                  Create
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Text className="mt-3">Blank Document</Text>
        </Container>
      </section>
      <MyDocuments />
    </div>
  );
}
