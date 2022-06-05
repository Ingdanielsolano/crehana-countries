import { ApolloClient, InMemoryCache } from "@apollo/client";

function getClient() {
  const client = new ApolloClient({
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
