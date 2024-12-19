"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {cn} from "@/lib/utils";
import { Text } from "@mantine/core";


const labelVariants = cva(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

// Создаем компонент Label
const Label = React.forwardRef<
    HTMLLabelElement,
    React.ComponentPropsWithoutRef<"label"> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
    <Text
        component="label"
        ref={ref}
        className={cn(labelVariants(), className)} // Кастомные классы
        {...props}
    />
));

Label.displayName = "Label";

export { Label };