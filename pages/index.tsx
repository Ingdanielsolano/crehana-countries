import { LoadingOutlined } from "@ant-design/icons";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Modal } from "antd";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import getClient from "../common/connection/apolloClient";
import CountryCard from "../components/home/CountryCard";
import Loader from "../components/loader";
import CountrySearchBar from "../components/home/CountrySearchBar";
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

  const [customLoading, setCustomLoading] = useState(false);

  useEffect(() => {
    setCustomLoading(true);
  }, []);

  return (
    <>
      <Head>
        <title>Listado de países</title>
        <meta name="description" content="Listado de países" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="home">
        {/* <Loader /> */}
        <Loader visible={customLoading} />
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
