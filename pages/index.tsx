import { useLazyQuery } from "@apollo/client";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import getClient from "../common/connection/apolloClient";
import CountryCard from "../components/home/CountryCard";
import CountrySearchBar from "../components/home/CountrySearchBar";
import Loader from "../components/loader";
import {
  Country,
  GetAllCountriesDocument,
  GetCountryDocument,
} from "../service/graphql";

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  countries,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [searchCountry, { data, loading, error }] =
    useLazyQuery(GetCountryDocument);

  console.log({ loading, data });

  useEffect(() => {
    if (!data?.country) return;
    const country = data.country as Country;
    setFilteredCountries([country]);
  }, [data]);

  return (
    <>
      <Head>
        <title>Listado de países</title>
        <meta name="description" content="Listado de países" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="home">
        <Loader visible={loading} />
        <h1 className="home__title">Countries</h1>
        <div className="home__searbar">
          <CountrySearchBar
            countries={countries}
            filterCountries={(value: string) =>
              searchCountry({
                variables: {
                  countryCode: value,
                },
              })
            }
          />
        </div>
        <div className="home__list">
          {filteredCountries.map((country) => (
            <CountryCard
              key={`Country-key-${country.code}`}
              country={country}
            />
          ))}
        </div>
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
