import { useLazyQuery } from "@apollo/client";
import { FC, useEffect, useState } from "react";
import { Country, GetCountryDocument } from "../../service/graphql";
import Loader from "../loader";
import CountryCard from "./components/CountryCard";
import CountrySearchBar from "./components/CountrySearchBar";

interface CountryListProps {
  countries: Country[];
}

const CountryList: FC<CountryListProps> = ({ countries }) => {
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
    <div className="country-list">
      <Loader visible={loading} />
      <h1 className="country-list__title">Countries</h1>
      <div className="country-list__searbar">
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
      <div className="country-list__list">
        {filteredCountries.map((country) => (
          <CountryCard key={`Country-key-${country.code}`} country={country} />
        ))}
      </div>
    </div>
  );
};

export default CountryList;
