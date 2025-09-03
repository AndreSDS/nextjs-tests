import { Button } from '@/components/ui/button';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    component: Button
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        children: 'Click me',
        variant: "default",
        size: "default",
    },
    render: (args) => <Button {...args}>Click me</Button>,
};

export const Secondary: Story = {
    args: {
        children: 'Click me',
        variant: "secondary",
        size: "default",
    },
};

export const Destructive: Story = {
    args: {
        children: 'Click me',
        variant: "destructive",
        size: "default",
    },
};

export const Small: Story = {
    args: {
        children: 'Click me',
        variant: "default",
        size: "sm",
    },
};

export const Large: Story = {
    args: {
        children: 'Click me',
        variant: "default",
        size: "lg",
    },
};

export const Link: Story = {
    args: {
        children: 'Click me',
        variant: "link",
        size: "default",
    },
};

export const Outline: Story = {
    args: {
        children: 'Click me',
        variant: "outline",
        size: "default",
    },
};

export const Ghost: Story = {
    args: {
        children: 'Click me',
        variant: "ghost",
        size: "default",
    },
};

export const Icon: Story = {
    args: {
        children: '😊',
        variant: "default",
        size: "icon"
    }
}