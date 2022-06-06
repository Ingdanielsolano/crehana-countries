import getClient from "@common/connection/apolloClient";
import { Country, GetAllCountriesDocument } from "@service/graphql";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import CountryList from "../components/CountryList/CountryList";

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  countries,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Listado de países</title>
        <meta
          name="description"
          content="Listado de países para Prueba de Crehana"
        />
        <meta property="og:title" content="Listado de países" />
        <meta
          property="og:description"
          content="Listado de países para Prueba de Crehana"
        />
        <meta
          property="og:image"
          content="https://upload.wikimedia.org/wikipedia/commons/5/55/Mapa_del_mundo_en_1970.jpg"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://crehana-countries.vercel.app/"
        />
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

    const countries = response.data.countries as Country[];

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
