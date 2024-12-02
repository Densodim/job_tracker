import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import UniversalInput from "@/app/components/Input/UniversalInput"
import { MantineProvider } from "@mantine/core"
import {theme} from "@/app/components/style/theme";
import '@mantine/core/styles.css';
import {ChangeEvent, useState} from "react";
import useInputChangeStorybook from "@/app/hooks/Storybook/useInputChangeStorybook";

const meta = {
  title: "Jobs/Universal Input",
  component: UniversalInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: {
        type: "select",
        options: ["text", "number", "select"],
      },
    },
    onChange: { action: "changed" },
    onBlur: { action: "blurred" },
    onKeyDown: { action: "keyDown" },
  },
  args: {
    label: "Enter value",
    value: "",
    placeholder: "Type something...",
    type: "text",
    onChange: fn(),
    onBlur: fn(),
    onKeyDown: fn(),
  },
} satisfies Meta<typeof UniversalInput>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args) => {
    const {value, handleChange} = useInputChangeStorybook(args.value, args.onChange);
    return (
        <MantineProvider theme={theme} >
          <UniversalInput {...args}
                          value={value}
                          onChange={handleChange}/>
        </MantineProvider>
    )
  },
  args: {
    label: "Text Input",
    value: "Sample text",
    placeholder: "Type here...",
  },
}

export const NumberInput: Story = {
  render: (args) => {
    const {value, handleChange} = useInputChangeStorybook(args.value, args.onChange);
    return (
      <MantineProvider theme={theme}>
        <UniversalInput {...args}
                        value={value}
                        onChange={handleChange}/>
      </MantineProvider>
    )
  },
  args: {
    label: "Number Input",
    value: 123,
    type: "number",
    placeholder: "Enter a number...",
  },
}

export const WithClearButton: Story = {
  render: (args) => {
    const {value, handleChange} = useInputChangeStorybook(args.value, args.onChange);
    return (
        <MantineProvider theme={theme} >
          <UniversalInput {...args}
                          value={value}
                          onChange={handleChange}/>
        </MantineProvider>
    )
  },
  args: {
    label: "Clearable Input",
    value: "Text to clear",
    placeholder: "Click to clear",
  },
}


