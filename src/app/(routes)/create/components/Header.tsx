import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
} from "@chakra-ui/react";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import { FcDocument } from "react-icons/fc";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";

export default function Header() {
  return (
    <Box className="h-12 w-full px-10 z-50 shadow-md flex items-center justify-between">
      <Box className="flex items-center gap-3">
        <GiHamburgerMenu size={24} className="text-blue-500" />
        <FcDocument size={30} />
        <h1 className="text-2xl font-bold">Doc-Write</h1>
      </Box>

      <InputGroup w={"fit-content"}>
        <InputLeftElement pointerEvents="none" className="pr-5">
          <IoIosSearch size={20} color="gray.300" />
        </InputLeftElement>
        <Input type="text" placeholder="Search" />
      </InputGroup>

      <UserButton />
    </Box>
  );
}
