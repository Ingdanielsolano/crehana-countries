import { Continent, Country } from "../service/graphql";

const countryMock: Country = {
  __typename: "Country",
  code: "AD",
  name: "Andorra",
  native: "Andorra",
  phone: "376",
  continent: {
    __typename: "Continent",
    code: "EU",
    name: "Europe",
  } as Continent,
  capital: "Andorra la Vella",
  currency: "EUR",
  languages: [
    {
      __typename: "Language",
      code: "ca",
      name: "Catalan",
      native: "Català",
      rtl: false,
    },
  ],
  emoji: "🇦🇩",
  emojiU: "U+1F1E6 U+1F1E9",
  states: [],
};

export default countryMock;
