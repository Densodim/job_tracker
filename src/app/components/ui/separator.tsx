"use client";

import { Divider } from "@mantine/core";

const Separator = ({
                       className,
                       orientation = "horizontal",
                       decorative = true, // Mantine Divider не использует "decorative", можно удалить
                       ...props
                   }: {
    className?: string;
    orientation?: "horizontal" | "vertical";
    decorative?: boolean;
}) => {
    return (
        <Divider
            className={className}
            orientation={orientation === "vertical" ? "vertical" : "horizontal"}
            {...props}
        />
    );
};

export { Separator };