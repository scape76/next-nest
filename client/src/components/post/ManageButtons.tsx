import React from "react";
import { useRouter } from "next/router";

import { Flex } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import postsService from "@/services/postsService";
import { useAppDispatch } from "@/store/hooks";
import { deletePost } from "@/store/postsSlice";

interface IManageButtons {
  postId: number;
  isUpdating: boolean;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ManageButtons({
  postId,
  isUpdating,
  setIsUpdating,
}: IManageButtons) {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    try {
      dispatch(deletePost(postId));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Flex justify="flex-end" gap="1rem" mb={2}>
      <EditIcon
        color="teal"
        cursor="pointer"
        onClick={() => setIsUpdating(!isUpdating)}
      />
      <DeleteIcon onClick={handleDelete} color="red.500" cursor="pointer" />
    </Flex>
  );
}
