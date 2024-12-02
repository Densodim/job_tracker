import type {Meta, StoryObj} from "@storybook/react";
import {fn} from "@storybook/test";

import {MantineProvider} from "@mantine/core";
import {theme} from "@/app/components/style/theme";
import UniversalSelect from "@/app/components/Select/UniversalSelect";
import useInputChangeStorybook from "@/app/hooks/Storybook/useInputChangeStorybook";

const meta = {
    title: "Jobs/Universal Select",
    component: UniversalSelect,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        onChange: {action: "changed"},
    },
    args: {
        label: "Select an Option",
        value: "Option 1",
        options: [
            {value: "Option 1", label: "Option 1"},
            {value: "Option 2", label: "Option 2"},
            {value: "Option 3", label: "Option 3"},
        ],
        onChange: fn(),
    },

} satisfies Meta<typeof UniversalSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: (args: any) => {
        const {value, handleChange} = useInputChangeStorybook(args.value, args.onChange);
        return (
            <MantineProvider theme={theme}>
                <UniversalSelect {...args}
                                 value={value}
                                 onChange={handleChange}
                />
            </MantineProvider>
        );
    },
    args: {
        label: "Select a value",
        value: "Option 1",
        options: [
            {value: "Option 1", label: "Option 1"},
            {value: "Option 2", label: "Option 2"},
            {value: "Option 3", label: "Option 3"},
        ],
    },
};

export const WithCustomPlaceholder: Story = {
    render: (args: any) => {
        return (
            <MantineProvider theme={theme}>
                <UniversalSelect {...args} />
            </MantineProvider>
        );
    },
    args: {
        label: "Select a custom option",
        value: "Option 2",
        placeholder: "Choose a custom option...",
        options: [
            {value: "Option 1", label: "Option 1"},
            {value: "Option 2", label: "Option 2"},
            {value: "Option 3", label: "Option 3"},
        ],
    },
};

export const EmptyOptions: Story = {
    render: (args: any) => {
        const {value, handleChange} = useInputChangeStorybook(args.value, args.onChange);
        return (
            <MantineProvider theme={theme}>
                <UniversalSelect {...args}
                                 value={value}
                                 onChange={handleChange}
                />
            </MantineProvider>
        );
    },
    args: {
        label: "Select from empty list",
        value: "",
        options: [],
    },
};

