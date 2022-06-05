import { useLazyQuery } from "@apollo/client";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import getClient from "@common/connection/apolloClient";
import CountryCard from "@components/CountryList/components/CountryCard";
import CountrySearchBar from "@components/CountryList/components/CountrySearchBar";
import Loader from "@components/loader";
import {
  Country,
  GetAllCountriesDocument,
  GetCountryDocument,
} from "@service/graphql";
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
