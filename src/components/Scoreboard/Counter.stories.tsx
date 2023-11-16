import React from 'react';
import { StoryObj, Meta } from '@storybook/react';

import { Counter, CounterProps } from './Counter';

export default {
  title: 'Scoreboard/Counter',
  component: Counter,
} as Meta;

type Story = StoryObj<CounterProps>;

const Template: Story = {
  render: (args) => <Counter {...args} />,
};

export const MinesweeperGameName: Story = {
  ...Template,
  args: { children: "010" },
};
