import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { GameName, GameNameProps } from "./GameName";

export default {
  title: "Top/GameName",
  component: GameName,
} as Meta;

type Story = StoryObj<GameNameProps>;

const Template: Story = {
  render: (args) => <GameName {...args} />,
};

export const MinesweeperGameName: Story = {
  ...Template,
  args: { children: "Minesweeper" },
};
