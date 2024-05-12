import { Timestamp, collection, doc, getDocs } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../../firebase";
import { UseToastOptions, useToast } from "@chakra-ui/react";
import { persist } from "zustand/middleware";

type Document = {
  createdAt: Timestamp;
  fileName: string;
  id: string;
  docId: string;
};

export interface DocumentState {
  documents: Document[];
  fetchDocuments: (
    toast: (options?: UseToastOptions | undefined) => void,
    userEmail: string
  ) => Promise<void>;
  // addDocument: (fileName: string) => Promise<void>;
}

interface SingleDocument {
  filename: string;
  id: string;
  docId: string;
  setFileName: (fileName: string) => void;
  setId: (id: string) => void;
  setDocId: (docId: string) => void;
}

export const useDocumentStore = create<DocumentState>((set) => ({
  documents: [],
  fetchDocuments: async (
    toast: (options?: UseToastOptions | undefined) => void,
    userEmail: string
  ) => {
    try {
      const userDocRef = doc(db, "userDocs", userEmail);
      const subcollectionRef = collection(userDocRef, "docs");
      const querySnapshot = await getDocs(subcollectionRef);
      const newDocuments: Document[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Document;
        newDocuments.push(data);
        console.log("ZUSTAND");
        console.log(data);
      });
      set((state) => ({ ...state, documents: newDocuments }));
    } catch (error) {
      console.error("Error fetching documents:", error);
      toast({
        title: "Error",
        description: "Failed to fetch documents",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  },
}));

export const useSingleDocumentStore = create<SingleDocument>()(
  persist(
    (set) => ({
      filename: "",
      id: "",
      docId: "",
      setFileName: (fileName: string) =>
        set((state) => ({ ...state, filename: fileName })),
      setId: (id: string) => set((state) => ({ ...state, id: id })),
      setDocId: (docId: string) => set((state) => ({ ...state, docId: docId })),
    }),
    {
      name: "single-document",
      getStorage: () => sessionStorage,
    }
  )
);

// export const useSingleDocumentStore = create<SingleDocument>((set) => ({
//   filename: "",
//   id: "",
//   setFileName: (fileName: string) =>
//     set((state) => ({ ...state, filename: fileName })),
//   setId: (id: string) => set((state) => ({ ...state, id: id })),
// }));
