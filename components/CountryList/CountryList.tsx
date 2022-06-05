import { useLazyQuery, useQuery } from "@apollo/client";
import { FC, useEffect, useState } from "react";
import {
  Continent,
  Country,
  CountryFilterInput,
  GetAllContinentsDocument,
  GetAllCountriesDocument,
} from "../../service/graphql";
import Loader from "../loader";
import CountryCard from "./components/CountryCard/CountryCard";
import CountrySearchBar from "./components/CountrySearchBar/CountrySearchBar";

interface CountryListProps {
  countries: Country[];
}

interface CountryFilters {
  currency: string[];
  continent: string[];
  code: string;
}

const CountryList: FC<CountryListProps> = ({ countries }) => {
  const [filterCountries, filterCountriesQuery] = useLazyQuery(
    GetAllCountriesDocument
  );

  const [filteredCountries, setFilteredCountries] =
    useState<Country[]>(countries);

  const [filters, setFilters] = useState<CountryFilters>({
    currency: [],
    continent: [],
    code: "",
  });

  useEffect(() => {
    if (!filterCountriesQuery.data?.countries) return;

    setFilteredCountries(filterCountriesQuery.data.countries as Country[]);
  }, [filterCountriesQuery.data]);

  useEffect(() => {
    if (
      filters.code === "" &&
      filters.continent.length === 0 &&
      filters.currency.length === 0
    ) {
      filterCountries();
      return;
    }

    const variables: CountryFilterInput = {
      code: {
        regex: filters.code,
      },
    };

    if (filters.continent.length > 0)
      variables.continent = {
        in: filters.continent,
      };

    if (filters.currency.length > 0)
      variables.currency = {
        in: filters.currency,
      };

    filterCountries({
      variables: {
        countryFilters: variables,
      },
    });
  }, [filters, filterCountries]);

  return (
    <div className="country-list">
      <Loader visible={filterCountriesQuery.loading} />
      <CountrySearchBar
        countries={countries}
        searchCountries={(value: string) => {
          const actualFilters = { ...filters };
          actualFilters.code = value;
          setFilters(actualFilters);
        }}
        filterCountriesByContinent={(values) => {
          setFilters({ ...filters, continent: values });
        }}
        filterCountriesByCurrency={(values) => {
          setFilters({ ...filters, currency: values });
        }}
      />
      <div className="country-list__list">
        {filteredCountries.map((country) => (
          <CountryCard key={`Country-key-${country.code}`} country={country} />
        ))}
      </div>
    </div>
  );
};

export default CountryList;
