import * as React from "react";
import {Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext} from "react-hook-form";
import {Text} from '@mantine/core';
import {cn} from "@/lib/utils";


const Form = FormProvider;

type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
    name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
      ...props
  }: ControllerProps<TFieldValues, TName>) => {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    );
};

const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext);
    const { getFieldState, formState } = useFormContext();

    const fieldState = getFieldState(fieldContext.name, formState);

    if (!fieldContext) {
        throw new Error("useFormField should be used within <FormField>");
    }

    return {
        name: fieldContext.name,
        ...fieldState,
    };
};

type FormItemContextValue = {
    id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        const id = React.useId();

        return (
            <FormItemContext.Provider value={{ id }}>
                <div ref={ref} className={cn("space-y-2", className)} {...props} />
            </FormItemContext.Provider>
        );
    }
);
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<React.ElementRef<typeof Text>, any>(
    ({ className, children, ...props }, ref) => {
        const { name } = useFormField();

        return (
            <Text ref={ref} className={cn("font-bold", className)} {...props}>
                {children || name}
            </Text>
        );
    }
);
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
    ({ ...props }, ref) => {
        return <div ref={ref} {...props} />;
    }
);
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => {
        const { name } = useFormField();

        return (
            <Text ref={ref} className={cn("text-xs text-muted", className)} {...props}>
                {props.children || `Enter your ${name}`}
            </Text>
        );
    }
);
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, children, ...props }, ref) => {
        const { error } = useFormField();
        const message = error ? String(error?.message) : children;

        if (!message) {
            return null;
        }

        return (
            <Text ref={ref} className={cn("text-xs font-medium text-red-500", className)} {...props}>
                {message}
            </Text>
        );
    }
);
FormMessage.displayName = "FormMessage";

export {
    useFormField,
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,
};

