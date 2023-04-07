import React from "react";
import type { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/userSlice";

import { Button, Flex, Heading, Text, textDecoration } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { useRouter } from "next/router";

function Header() {
  const email = useSelector((state: RootState) => state.user.userData?.email);
  const isAuth = useAppSelector((state: RootState) => state.user.isAuth);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleButtonClick = () => {
    router.push("/create-post");
  };

  return (
    <Flex
      h="5rem"
      background="gray.100"
      justify="space-around"
      align="center"
      gap="1rem"
      px="1rem"
    >
      <Link href="/" style={{ textDecoration: "none" }}>
        <Heading color="teal">
          ITwitter
        </Heading>
      </Link>
      <Flex gap="1rem" align="center">
        <Text>{email}</Text>
        {isAuth ? (
          <>
            <Button color="teal" onClick={handleButtonClick}>
              Create post
            </Button>
            <Link href="/" onClick={handleLogout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link href="login">Login</Link>
            <Link href="signup">Register</Link>
          </>
        )}
      </Flex>
    </Flex>
  );
}

export default Header;
