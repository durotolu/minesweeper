import React from 'react';
import { StoryObj, Meta } from '@storybook/react';

import { Reset, ResetProps } from './Reset';


export default {
  title: 'Scoreboard/Counter',
  component: Reset,
} as Meta;

type Story = StoryObj<ResetProps>;

const Template: Story = {
  render: (args) => <Reset {...args} />,
};

export const ResetExample: Story = {
  ...Template,
};
