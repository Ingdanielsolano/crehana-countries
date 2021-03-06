import { ApolloProvider } from "@apollo/client";
import getClient from "@common/connection/apolloClient";
import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import "../sass/main.scss";

const client = getClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
