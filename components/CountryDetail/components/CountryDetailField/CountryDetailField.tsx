/* eslint-disable @next/next/no-img-element */
import { FC } from "react";

interface CountryDetailProps {
  title: string;
  description: string;
}

const CountryDetailField: FC<CountryDetailProps> = ({ title, description }) => {
  return (
    <div className="country-field">
      <div className="country-field__title">{title}</div>
      <div className="country-field__desc">{description}</div>
    </div>
  );
};

export default CountryDetailField;
