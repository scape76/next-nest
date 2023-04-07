import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/store/userSlice";
import { getPosts } from "@/store/postsSlice";

import { Flex } from "@chakra-ui/react";
import Header from "../components/Header";
import Post from "@/components/post/Post";

export default function App() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((store) => store.posts.posts);

  useEffect(() => {
    dispatch(getPosts());
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, []);

  return (
    <>
      <Header />
      <Flex direction="column" align="center" mb={6}>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Flex>
    </>
  );
}
