import React from "react";
import { StoryObj, Meta } from "@storybook/react";

import { Scoreboard, ScoreboardProps } from "./Scoreboard";

export default {
  title: "Scoreboard/Counter",
  component: Scoreboard,
} as Meta;

type Story = StoryObj<ScoreboardProps>;

const Template: Story = {
  render: (args) => <Scoreboard {...args} />,
};

export const ScoreboardExample: Story = {
  ...Template,
  args: {
    time: "000",
    levels: ["beginner", "intermediate", "expert"],
    bombs: "010",
  },
};
