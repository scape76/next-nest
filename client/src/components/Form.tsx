import React, { useState } from "react";
import { login, register } from "../store/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import {
  Flex,
  Heading,
  Input,
  Button,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { useRouter } from "next/router";

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const error = useAppSelector((store) => store.user.error);

  const router = useRouter();
  const isLogin = router.pathname === "/login";

  const formBackground = useColorModeValue("gray.100", "gray.700");

  const handleLogin = async () => {
    try {
      if (isLogin) {
        await dispatch(login({ email, password })).unwrap();
      } else {
        await dispatch(register({email, password })).unwrap();
      }
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <Flex direction="column" background={formBackground} p={12} rounded={6}>
        <Heading mb={6}>{isLogin ? "Log in" : "Sign up"}</Heading>
        <Input
          placeholder="example@gmail.com"
          variant="filled"
          mb={3}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="********"
          variant="filled"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Text color="red.600">{error}</Text>
        <Button my={6} colorScheme="teal" onClick={handleLogin}>
          {isLogin ? "Log in" : "Sign up"}
        </Button>
        <Text>{isLogin ? "Don't have an account?" : "Already signed up?"}</Text>
        <Link display="block" href={isLogin ? "signup" : "login"}>
          <Button border="1px solid teal" mt={4} w="full">
            {isLogin ? "Sign up" : "Log in"}
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}
