/* eslint-disable @next/next/no-img-element */
import { FC, useState } from "react";
import { Continent, Country, GetAllContinentsDocument } from "@service/graphql";
import { Select } from "antd";
import { useQuery } from "@apollo/client";

const { Option } = Select;

interface CountrySearchProps {
  countries: Country[];
  searchCountries: (value: string) => void;
  filterCountriesByContinent: (value: string[]) => void;
  filterCountriesByCurrency: (value: string[]) => void;
}

const CountrySearchBar: FC<CountrySearchProps> = ({
  countries,
  searchCountries: filterCountries,
  filterCountriesByContinent,
  filterCountriesByCurrency,
}) => {
  const continentQuery = useQuery(GetAllContinentsDocument);
  const [currencies] = useState<string[]>([
    ...new Set(
      countries
        .map((country) => country.currency || "")
        .filter((currency) => currency !== "")
    ),
  ]);

  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="country-search">
      <input
        list="countries"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <datalist id="countries">
        {countries.map(({ code, name }) => (
          <option key={`Search-Country-key-${name}`} value={code}>
            {name}
          </option>
        ))}
      </datalist>
      <button
        onClick={() => filterCountries(searchValue)}
        disabled={searchValue === ""}
      >
        Buscar
      </button>

      <Select
        mode="tags"
        size="large"
        placeholder="Please continent"
        onChange={(e) => filterCountriesByContinent(e)}
        style={{ width: "100%" }}
      >
        {continentQuery.data?.continents?.map((continent) => (
          <Option key={continent.code}>{continent.name}</Option>
        ))}
      </Select>

      <Select
        mode="tags"
        size="large"
        placeholder="Please currency"
        onChange={(e) => filterCountriesByCurrency(e)}
        style={{ width: "100%" }}
      >
        {currencies.map((currency) => (
          <Option key={currency}>{currency}</Option>
        ))}
      </Select>
    </div>
  );
};

export default CountrySearchBar;
