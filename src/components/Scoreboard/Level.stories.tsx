import React from "react";
import { StoryObj, Meta } from "@storybook/react";

import { Level, LevelProps } from "./Level";

export default {
  title: "Scoreboard/Level",
  component: Level,
} as Meta;

type Story = StoryObj<LevelProps>;

const Template: Story = {
  render: (args) => <Level {...args} />,
};

export const LevelExample: Story = {
  ...Template,
  args: {
    children: ["beginner", "intermediate", "expert"],
    value: "intermediate",
  },
};
