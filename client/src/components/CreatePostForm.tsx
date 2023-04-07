import React, { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import postsService from "@/services/postsService";
import postsSlice, { createPost } from "@/store/postsSlice";

import { Flex, Heading, Input, Textarea, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  const handleCreatePost = async () => {
    try {
      await postsService.createPost(title, content);
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Flex
      width="60%"
      maxW="350px"
      minW="280px"
      direction="column"
      justifyContent="center"
      background="gray.100"
      p={8}
      rounded="xl"
    >
      <Heading mb={6}>Create your post</Heading>
      <Input
        placeholder="title"
        value={title}
        p={2}
        mb={6}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="content"
        resize="none"
        spellCheck={false}
        p={2}
        mb={6}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button alignSelf="flex-end" p={4} onClick={handleCreatePost}>
        Create
      </Button>
    </Flex>
  );
}
