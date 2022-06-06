/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import { Country } from "../../service/graphql";
import CountryDetailField from "./components/CountryDetailField/CountryDetailField";

interface CountryDetailProps {
  country: Country;
}

const CountryDetail: FC<CountryDetailProps> = ({ country }) => (
  <div className="country-detail">
    <div className="country-detail__header">
      <p>
        <span>{country.name}</span>, {country.capital}
      </p>
      <img
        src={`https://countryflagsapi.com/png/${country.code}`}
        alt={`Country-${country.name}`}
      />
    </div>
    <CountryDetailField description={country.code} title="Código" />
    <CountryDetailField
      description={country.continent.name}
      title="Contienente"
    />
    <CountryDetailField description={country.currency || ""} title="Moneda" />
    <CountryDetailField
      description={country.languages
        .map((language) => language.name)
        .join(" | ")}
      title="Lenguajes"
    />
  </div>
);

export default CountryDetail;
