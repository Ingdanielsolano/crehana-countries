import { ApolloClient, InMemoryCache } from "@apollo/client";

function getClient(props) {
  const client = new ApolloClient({
    ...props,
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    cache: new InMemoryCache({
      typePolicies: {
        country: {
          keyFields: ["code"],
        },
      },
    }),
  });
  return client;
}

export default getClient;
