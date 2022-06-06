import "@testing-library/jest-dom/extend-expect";
import countriesMock from "../../../../__mocks__/CountriesMock";
import { MockedProvider } from "@apollo/client/testing";
import CountrySearchBar from "./CountrySearchBar";
import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";

describe("<CountrySearchBar />", () => {
  test("it render", () => {
    render(
      <MockedProvider>
        <CountrySearchBar
          countries={countriesMock}
          filterCountriesByContinent={() => {}}
          filterCountriesByCurrency={() => {}}
          searchCountries={() => {}}
        />
      </MockedProvider>
    );
  });

  test("Show search component", async () => {
    render(
      <MockedProvider>
        <CountrySearchBar
          countries={countriesMock}
          filterCountriesByContinent={() => {}}
          filterCountriesByCurrency={() => {}}
          searchCountries={() => {}}
        />
      </MockedProvider>
    );
    const searchIcon = screen.queryByAltText("Search");
    if (searchIcon === null) throw new Error("SearchIcon not found");

    fireEvent.click(searchIcon);
    expect(await screen.findByPlaceholderText("Filtrar por país")).toBeTruthy();
  });
});
