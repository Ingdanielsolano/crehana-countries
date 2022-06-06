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
import CountryDetail from "../../components/CountryDetail/CountryDetail";

interface ContextParams {
  params: {
    code: string;
  };
}

const CountryDetailPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ country }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>{country.name}</title>
        <meta name="description" content={`Detalle del país ${country.name}`} />
        <meta property="og:title" content={`${country.name}`} />
        <meta
          property="og:description"
          content={`Detalle del país ${country.name}`}
        />
        <meta
          property="og:image"
          content={`https://countryflagsapi.com/png/${country.code}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://crehana-countries.vercel.app/country/${country.code}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <CountryDetail country={country} />
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

export default CountryDetailPage;
