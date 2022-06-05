/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import { Country } from "../../service/graphql";

interface CountryCardProps {
  country: Country;
}

const CountryCard: FC<CountryCardProps> = ({ country }) => (
  <div className="country-card">
    <img
      src={`https://countryflagsapi.com/png/${country.code}`}
      alt={`Country-${country.name}`}
    />

    <h2 className="country-card__title">{country.name}</h2>
  </div>
);

export default CountryCard;
