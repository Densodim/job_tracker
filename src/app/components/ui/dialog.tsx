"use client";

import * as React from "react";
// Заменяем Radix на Mantine
import {Modal, Text} from "@mantine/core";
import {cn} from "@/lib/utils";
import {Button} from "@/app/components/ui/button";


// Заменяем DialogPrimitive.Root на Modal
const Dialog = ({
                    opened,
                    setOpened,
                    children,
                }: {
    opened: boolean;
    setOpened: () => void;
    children: React.ReactNode;
}) => {
    return (
        <>
            <Modal
                opened={opened}
                onClose={setOpened}
                centered
                withCloseButton={false}
                title="Authentication"
            >
                {children}
            </Modal>
        </>
    );
};

// DialogTrigger заменяем на кнопку Mantine
const DialogTrigger = ({
                           onClick,
                           children,
                       }: {
    onClick?: () => void;
    children: React.ReactNode;
}) => (
    <Button onClick={onClick} variant="outline">
        {children}
    </Button>
);

// DialogOverlay можно опустить, так как Mantine обрабатывает это внутри Modal

// DialogContent заменяем на содержимое Modal
const DialogContent = ({
                           children,
                           className,
                       }: {
    children: React.ReactNode;
    className?: string;
}) => {
    return <div className={cn("p-6", className)}>{children}</div>;
};

// DialogHeader
const DialogHeader = ({
                          className,
                          ...props
                      }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col space-y-1.5 text-center sm:text-left",
            className
        )}
        {...props}
    />
);
DialogHeader.displayName = "DialogHeader";

// DialogFooter
const DialogFooter = ({
                          className,
                          ...props
                      }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
            className
        )}
        {...props}
    />
);
DialogFooter.displayName = "DialogFooter";

// DialogTitle
const DialogTitle = ({
                         className,
                         children,
                     }: {
    className?: string;
    children: React.ReactNode;
}) => <Text className={cn("text-lg font-semibold", className)}>{children}</Text>;

// DialogDescription
const DialogDescription = ({
                               className,
                               children,
                           }: {
    className?: string;
    children: React.ReactNode;
}) => (
    <Text className={cn("text-sm text-muted-foreground", className)}>
        {children}
    </Text>
);

export {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
};
