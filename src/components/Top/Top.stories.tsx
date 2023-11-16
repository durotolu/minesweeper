import React, { FC } from "react";
import { StoryObj, Meta } from "@storybook/react";

import { Top, TopComponentType } from "./Top";

export default {
  title: "Top/Top",
  component: Top,
} as Meta;

type Story = StoryObj<TopComponentType>;

const Template: Story = {
  render: (args) => <Top {...args} />,
};

export const TopPanel: Story = {
  ...Template,
  args: {
    children: "Minesweeper",
    feature: "Flag",
    firstAction: "Ctrl",
    secondAction: "click",
  },
};
