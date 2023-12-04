import React from "react";
import { MemoryRouter, BrowserRouter, useSearchParams } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { GameWithHooks } from "./GameWithHooks";

const mockOnClick = jest.fn();
const mockOnChangeLevel = jest.fn();
const mockOnReset = jest.fn();
const mockOnContextMenu = jest.fn();
const mockSetSearchParams = jest.fn();

// jest.mock("react-router-dom", () => ({
//   useSearchParams: jest.fn,
// }));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

(useSearchParams as jest.Mock).mockReturnValue([
  { get: () => null },
  mockSetSearchParams,
]);

jest.mock("./useGame", () => ({
  __esModule: true,
  useGame: (level = "beginner") => ({
    level,
    time: 0,
    flagCounter: 0,
    isGameOver: true,
    isWin: false,
    settings: [9, 10],
    playerField: [
      [10, 10],
      [10, 10],
    ],
    onClick: mockOnClick,
    onContextMenu: mockOnContextMenu,
    onChangeLevel: mockOnChangeLevel,
    onReset: mockOnReset,
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("GameWithHooks test cases", () => {
  describe("Render behaviour", () => {
    it("Render game field by default", () => {
      const { asFragment } = render(
        <MemoryRouter
          initialEntries={[{ pathname: "/", search: "?level=beginner" }]}
        >
          <GameWithHooks />
        </MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot();
    });
    it("Cell click works fine", async () => {
      render(
        <MemoryRouter
          initialEntries={[{ pathname: "/", search: "?level=beginner" }]}
        >
          <GameWithHooks />
        </MemoryRouter>
      );
      await userEvent.click(screen.getByTestId("0,0"));
      expect(mockOnClick).toHaveBeenCalled();
    });
    it("Context menu handler on a cell works fine", async () => {
      render(
        <MemoryRouter
          initialEntries={[{ pathname: "/", search: "?level=beginner" }]}
        >
          <GameWithHooks />
        </MemoryRouter>
      );
      await userEvent.pointer({
        keys: "[MouseRight>]",
        target: screen.getByTestId("0,0"),
      });
      expect(mockOnContextMenu).toHaveBeenCalled();
    });
    it("Reset handler works fine", async () => {
      render(
        <MemoryRouter
          initialEntries={[{ pathname: "/", search: "?level=beginner" }]}
        >
          <GameWithHooks />
        </MemoryRouter>
      );
      await userEvent.click(screen.getByRole("button"));
      expect(mockOnReset).toHaveBeenCalled();
    });
    it("Change level works fine", async () => {
      render(
        <MemoryRouter
          initialEntries={[{ pathname: "/", search: "?level=beginner" }]}
        >
          <GameWithHooks />
        </MemoryRouter>
      );
      await userEvent.selectOptions(
        screen.getByRole("combobox"),
        "intermediate"
      );
      expect(mockOnChangeLevel).toHaveBeenCalled();
      expect(mockSetSearchParams).toHaveBeenCalledWith({
        level: `intermediate`,
      });
    });
    it("Level in search params works fine", () => {
      (useSearchParams as jest.Mock).mockReturnValue([
        { get: () => "intermediate" },
        mockSetSearchParams,
      ]);

      render(
        <MemoryRouter
          initialEntries={[{ pathname: "/", search: "?level=intermediate" }]}
        >
          <GameWithHooks />
        </MemoryRouter>
      );
      const intermediateOption = screen.queryByText("intermediate");
      expect(intermediateOption).toBeInTheDocument();
    });
    it("Game over reset the game state", async () => {
      render(
        <MemoryRouter
          initialEntries={[{ pathname: "/", search: "?level=beginner" }]}
        >
          <GameWithHooks />
        </MemoryRouter>
      );
      await userEvent.click(screen.getByText("🙁"));
      expect(mockOnReset).toHaveBeenCalled();
    });
  });
});
