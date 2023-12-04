import React from "react";
import { useSearchParams } from "react-router-dom";

import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import { GameWithUseReducer } from "./GameWithUseReducer";

jest.mock("@/core/Field");

const mockSetSearchParams = jest.fn();

jest.mock("react-router-dom", () => ({
  useSearchParams: jest.fn(),
}));

(useSearchParams as jest.Mock).mockReturnValue([
  { get: () => null },
  mockSetSearchParams,
]);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("GameWithHooks test cases", () => {
  it("Render game field by default", async () => {
    const { asFragment } = render(<GameWithUseReducer />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("Cell click works fine", async () => {
    const { asFragment } = render(<GameWithUseReducer />);
    await userEvent.click(screen.getByTestId("0,0"));
    expect(asFragment()).toMatchSnapshot();
  });
  it("Context menu handler on a cell works fine", async () => {
    const { asFragment } = render(<GameWithUseReducer />);
    await userEvent.click(screen.getByTestId("0,0"), { button: 2 });
    expect(asFragment()).toMatchSnapshot();
  });
  it("Reset handler works fine", async () => {
    const { asFragment } = render(<GameWithUseReducer />);
    await userEvent.click(screen.getByTestId("0,0"));
    expect(asFragment()).toMatchSnapshot();
    await userEvent.click(screen.getByRole("button"));
    expect(asFragment()).toMatchSnapshot();
  });
  it("Change level works fine", async () => {
    const { asFragment } = render(<GameWithUseReducer />);
    await userEvent.selectOptions(screen.getByRole("combobox"), "intermediate");
    expect(mockSetSearchParams).toHaveBeenCalledWith({ level: "intermediate" });
    expect(asFragment()).toMatchSnapshot();
  });
  it("Game over reset the game state", async () => {
    const { asFragment } = render(<GameWithUseReducer />);
    await userEvent.click(screen.getByTestId("8,8"));
    expect(asFragment()).toMatchSnapshot();
    await userEvent.click(screen.getByText("🙁"));
    expect(asFragment()).toMatchSnapshot();
  });
});
