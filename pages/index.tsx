import getClient from "@common/connection/apolloClient";
import { Country, GetAllCountriesDocument } from "@service/graphql";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import groupBy from "../common/groupBy";
import CountryList from "../components/CountryList/CountryList";

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  countries,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Listado de países</title>
        <meta name="description" content="Listado de países" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <CountryList countries={countries} />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  countries: Country[];
}> = async () => {
  try {
    const client = getClient();
    const response = await client.query({
      query: GetAllCountriesDocument,
      fetchPolicy: "network-only",
    });

    if (response.data.countries == null || response.data.countries == undefined)
      throw new Error("Can't get countries");

    let countries = response.data.countries as Country[];
    countries.sort((a, b) => {
      if (a.name < b.name) return 1;
      if (a.name > b.name) return -1;
      return 0;
    });

    return {
      props: {
        countries: countries,
      },
      revalidate: 20,
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        countries: [],
      },
      revalidate: 60,
    };
  }
};

export default Home;
