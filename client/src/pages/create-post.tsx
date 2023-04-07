import React from "react";

import { Flex } from "@chakra-ui/react";
import Header from "@/components/Header";
import CreatePostForm from "@/components/CreatePostForm";

export default function CreatePost() {
  return (
    <>
      <Header />
      <Flex justify="center" mt={10}>
        <CreatePostForm />
      </Flex>
    </>
  );
}
