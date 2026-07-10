import type { Meta, StoryObj } from "@storybook/react";
import StudyPage from "../app/study/page";

const meta: Meta<typeof StudyPage> = {
  component: StudyPage,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        query: {
          studyMinute: "25",
          breakMinute: "5",
        },
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof StudyPage>;

export const Default: Story = {};
