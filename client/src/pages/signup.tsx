import React from "react";

import { Flex, Heading, Input, Textarea, Button } from "@chakra-ui/react";

export default function Popup() {
  return (
    <Flex
      top="calc(30vh)"
      left="calc(45vw)"
      direction="column"
      justifyContent="center"
      background="gray.100"
      p={8}
      rounded="xl"
    >
      <Heading mb={6}>Create your post</Heading>
      <Input placeholder="title" p={2} mb={6} />
      <Textarea placeholder="content" resize="none" p={2} mb={6} />
      <Button alignSelf="flex-end" p={4}>
        Create
      </Button>
    </Flex>
  );
}
