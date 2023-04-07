import React, { useMemo, useState } from "react";
import { getTimeAgo } from "@/common/time";
import { RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updatePost } from "@/store/postsSlice";

import { Container, Text, Center, Box, Input, Flex } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import ManageButtons from "./ManageButtons";

interface IPostProps {
  post: Post;
}

export default function Post({ post }: IPostProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content || "");
  const createdAgo = getTimeAgo(post.createdAt);

  const currentUser = useAppSelector((store: RootState) => store.user.userData);
  const isUserAuthor = currentUser?.id === post.authorId;

  const dispatch = useAppDispatch();

  const handleUpdate = () => {
    dispatch(updatePost({ id: post.id, title, content }));
    setIsUpdating(false);
  };

  return (
    <Box
      color="white"
      dropShadow="2xl"
      w="400px"
      border="1px solid gray"
      mt={4}
    >
      <Container w="full" p={6}>
        {isUserAuthor && (
          <ManageButtons
            postId={post.id}
            isUpdating={isUpdating}
            setIsUpdating={setIsUpdating}
          />
        )}
        <Text color="gray.500">
          Posted by {post.author.email}, {createdAgo} ago
        </Text>
        <Center fontSize="2xl" color="gray.700" my={4}>
          <Input
            w="fit-content"
            border={isUpdating ? "1px solid teal" : "none"}
            readOnly={!isUpdating}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Center>
        <Input
          border={isUpdating ? "1px solid teal" : "none"}
          color="gray.700"
          readOnly={!isUpdating}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Flex justifyContent="flex-end" mt={4}>
          {isUpdating && (
            <CheckIcon color="teal" cursor="pointer" onClick={handleUpdate} />
          )}
        </Flex>
      </Container>
    </Box>
  );
}
