import React, { FC } from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { Reset } from "./Reset";

describe("Reset button check", () => {
  const ResetWithDummyHandlerOnReset: FC = () => <Reset onReset={() => null} />;
  it("Reset renders correctly", () => {
    const onReset = jest.fn();

    const { asFragment } = render(<Reset onReset={onReset} />);

    expect(asFragment()).toMatchSnapshot();
  });
  it("Should render elements with default state", () => {
    render(<ResetWithDummyHandlerOnReset />);

    // screen.debug();
    expect(screen.getByText("🙂")).toBeInTheDocument();
  });
  it("onReset handler should be called", () => {
    const onReset = jest.fn();

    render(<Reset onReset={onReset} />);

    fireEvent.click(screen.getByText("🙂"));

    expect(onReset).toHaveBeenCalled();
  });
  it("Should change state when onMouseDown and onMouseUp events happened", () => {
    render(<ResetWithDummyHandlerOnReset />);

    fireEvent.mouseDown(screen.getByText("🙂"));
    expect(screen.getByText("😯")).toBeInTheDocument();

    fireEvent.mouseUp(screen.getByText("😯"));
    expect(screen.getByText("🙂")).toBeInTheDocument();
  });
  it("Should change state when onMouseDown, and onMouseLeave events happened", () => {
    render(<ResetWithDummyHandlerOnReset />);

    fireEvent.mouseDown(screen.getByText("🙂"));
    expect(screen.getByText("😯")).toBeInTheDocument();

    fireEvent.mouseLeave(screen.getByText("😯"));
    expect(screen.getByText("🙂")).toBeInTheDocument();
  });
});
