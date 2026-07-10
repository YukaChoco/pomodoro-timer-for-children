import type { Meta, StoryObj } from "@storybook/react";
import Timer from "../app/components/Timer";

const meta: Meta<typeof Timer> = {
  component: Timer,
  argTypes: {
    currentTime: { control: { type: "number" } },
  },
};
export default meta;

type Story = StoryObj<typeof Timer>;

export const Studying: Story = {
  args: {
    currentTime: 25 * 60,
    isStudying: true,
  },
};

export const Break: Story = {
  args: {
    currentTime: 5 * 60,
    isStudying: false,
  },
};
