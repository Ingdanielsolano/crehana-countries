/* eslint-disable @next/next/no-img-element */
import { FC, useState } from "react";
import { Continent, Country, GetAllContinentsDocument } from "@service/graphql";
import { Select, Input, AutoComplete } from "antd";
import { useQuery } from "@apollo/client";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Search } = Input;

interface CountrySearchProps {
  countries: Country[];
  searchCountries: (value: string) => void;
  filterCountriesByContinent: (value: string[]) => void;
  filterCountriesByCurrency: (value: string[]) => void;
}

const CountrySearchBar: FC<CountrySearchProps> = ({
  countries,
  searchCountries,
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
      <div className="country-search__filters">
        <Select
          mode="tags"
          placeholder="Filtra por continente"
          onChange={(e) => filterCountriesByContinent(e)}
          onClear={() => filterCountriesByContinent([""])}
        >
          {continentQuery.data?.continents?.map((continent) => (
            <Option key={continent.code}>{continent.name}</Option>
          ))}
        </Select>

        <Select
          mode="tags"
          placeholder="Filtra por moneda"
          onChange={(e) => filterCountriesByCurrency(e)}
          onClear={() => filterCountriesByCurrency([""])}
        >
          {currencies.map((currency) => (
            <Option key={currency}>{currency}</Option>
          ))}
        </Select>
      </div>
      <div className="country-search__country">
        <h2 className="country-search__title">Países</h2>
        <AutoComplete
          className="country-search__input"
          allowClear
          options={countries.map(({ code, name }) => ({
            label: name,
            value: code,
          }))}
          onChange={(e) => setSearchValue(e)}
          onClear={() => {
            setSearchValue("");
            searchCountries("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") searchCountries(searchValue);
          }}
          onSelect={(selected: string) => searchCountries(selected)}
        >
          <Input
            prefix={
              <SearchOutlined onClick={(e) => searchCountries(searchValue)} />
            }
          />
        </AutoComplete>
      </div>
    </div>
  );
};

export default CountrySearchBar;
