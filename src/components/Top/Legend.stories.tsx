import React from "react";
import {
  // Story,
  Meta,
  StoryObj,
} from "@storybook/react";

import { Legend, LegendProps } from "./Legend";

export default {
  title: "Top/Legend",
  component: Legend,
} as Meta;

type Story = StoryObj<LegendProps>;

// const Template: Story = (args) => <Legend {...args} />
const Template: Story = {
  // args: {},
  render: (args) => <Legend {...args} />,
};

// const Template: Story = (args) => <Legend {...args} />
// const Template: StoryObj<typeof Legend> = {
//   render: (args) => {
//     return {
//       props: args,
//       template: `<molecule-story-component></molecule-story-component>`
//     };
//   }
// };

// export const GameLegend = Template.bind({})

export const GameLegend: Story = {
  ...Template,
  args: { feature: "Flag", firstAction: "ctrl", secondAction: "click" },
  // parameters: { background: { default: "dark" } },
};
