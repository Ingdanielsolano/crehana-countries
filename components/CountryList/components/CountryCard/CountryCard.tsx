/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import { Country } from "@service/graphql";
import Link from "next/link";

interface CountryCardProps {
  country: Country;
}

const CountryCard: FC<CountryCardProps> = ({ country }) => (
  <Link href={`/country/${country.code}`}>
    <div className="country-card">
      <img
        src={`https://countryflagsapi.com/png/${country.code}`}
        alt={`Country-${country.name}`}
      />

      <h2 className="country-card__title">{country.name}</h2>
    </div>
  </Link>
);

export default CountryCard;
