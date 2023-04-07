import { ChakraProvider } from "@chakra-ui/react";
import { store } from "../store/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
