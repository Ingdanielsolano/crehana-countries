/* eslint-disable @next/next/no-img-element */
import { FC, useState } from "react";
import { Country } from "../../service/graphql";

interface CountrySearchProps {
  countries: Country[];
  filterCountries: (value: string) => void;
}

const CountrySearchBar: FC<CountrySearchProps> = ({
  countries,
  filterCountries,
}) => {
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
    </div>
  );
};

export default CountrySearchBar;
