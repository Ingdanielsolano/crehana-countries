import getClient from "@common/connection/apolloClient";
import {
  Country,
  GetAllCountriesDocument,
  GetCountryDocument,
} from "@service/graphql";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";

interface ContextParams {
  params: {
    code: string;
  };
}

const CountryDetail: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ country }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Listado de países</title>
        <meta name="description" content="Listado de países" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <img src={`https://countryflagsapi.com/png/${country.code}`} />
        <p>{country.name}</p>
        <p>{country.code}</p>
        <p>{country.capital}</p>
        <p>{country.continent.name}</p>
        <p>{country.currency}</p>
        <p>{country.emoji}</p>
        <p>{country.emojiU}</p>
        <p>{country.languages.map((language) => language.name)}</p>
        <p>{country.native}</p>
        <p>{country.phone}</p>
        <p>{country.states.map((state) => state.name)}</p>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<{
  code: string;
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

    const paths = countries.map((country) => ({
      params: { code: country.code },
    }));

    console.log(paths);

    return { paths, fallback: "blocking" };
  } catch (error) {
    console.log(error);
    return { paths: [], fallback: "blocking" };
  }
};

export const getStaticProps: GetStaticProps<{
  country: Country;
}> = async (context) => {
  const { params } = context as ContextParams;
  const client = getClient();
  const response = await client.query({
    query: GetCountryDocument,
    fetchPolicy: "network-only",
    variables: {
      countryCode: params.code,
    },
  });

  if (response.data.country == null || response.data.country == undefined)
    throw new Error("Can't get country");

  let country = response.data.country as Country;

  return {
    props: {
      country: country,
    },
    revalidate: 20,
  };
};

export default CountryDetail;