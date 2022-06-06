import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import countryMock from "../../__mocks__/CountryMock";
import CountryDetail from "./CountryDetail";

describe("<CountryDetail />", () => {
  test("it render", () => {
    render(<CountryDetail country={countryMock} />);
  });

  test("Name is visible", async () => {
    render(<CountryDetail country={countryMock} />);
    expect(await screen.findByText("Andorra")).toBeVisible();
  });

  test("Flag is visible", async () => {
    render(<CountryDetail country={countryMock} />);
    expect(
      await screen.findByAltText(`Country-${countryMock.name}`)
    ).toBeVisible();
  });
});
