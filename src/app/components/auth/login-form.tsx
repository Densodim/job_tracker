"use client";

import React, { useState, useTransition } from "react";

import * as ShadcnForm from "../ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from "zod";

import { useRouter, useSearchParams } from "next/navigation";
import {DEFAULT_LOGIN_REDIRECT} from "@/lib/routes";

import {useShowNotification} from "@/app/hooks/useShowNotification";
import {LoginSchema} from "@/schemas";
import {T_VALIDATE_DATA_TYPES} from "@/types.ts/types";
import {loginAction} from "@/server-actions/login";
import CardWrapper from "@/app/components/card-wrapper";
import {Button} from "@/app/components/ui/button";
import {Input} from "@/app/components/ui/input";


export const LoginForm = () => {
    const [isPending, setTransition] = useTransition();
    const [showTwoFactor, setShowTwoFactor] = useState(false);

    const router = useRouter();

    const searchParams = useSearchParams();
    const urlError = searchParams.get("error");
    const callbackUrl = searchParams.get("callBackUrl");

    // const form
    const form = useForm<zod.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
            twoFAcode: "",
        },
    });

    // This will spread a set of functions from the useForm
    /**
     * @param console.log({ ...form })} ;
     */

    const onSubmit = (values: zod.infer<typeof LoginSchema>) => {
        setTransition(() => {
            loginAction(values, callbackUrl).then((data: T_VALIDATE_DATA_TYPES) => {
                if (data) {
                    if (data.error) {
                        // toast.error(data.error, { theme: "colored" });
                        useShowNotification({isError:true, messageIsSuccess:data.error})
                        form.reset();
                        return;
                    }
                    if (data.success) {
                        // toast.success(data.success, { theme: "colored" });
                        useShowNotification({isSuccess:true, messageIsSuccess:data.success})
                        form.reset();
                        // router.push();
                        router.refresh();

                        window.location.replace(callbackUrl || DEFAULT_LOGIN_REDIRECT);
                        window.location.reload();
                        return;
                    }
                    if (data.info) {
                        // toast.info(data.info, { theme: "colored" });
                        useShowNotification({isSuccess:true, messageIsSuccess:data.info})
                        form.reset();
                        return;
                    }
                    if (data.twoFactor) {
                        // toast.info("2FA code has been sent to your Email", {
                        //     theme: "colored",
                        // });
                        useShowNotification({isSuccess:true, messageIsSuccess:"2FA code has been sent to your Email"})
                        setShowTwoFactor((prev) => !prev);
                        return;
                    }
                }
                if (urlError === "OAuthAccountNotLinked") {
                    // toast.error("Email Already in use with another provider", {
                    //     theme: "colored",
                    // });
                    useShowNotification({isError:true, messageIsSuccess:"Email Already in use with another provider"})
                    form.reset();
                }

                // toast.error(data.error, { theme: "colored" });
            });
        });
    };

    return (
        <CardWrapper
            headerTitle="next Auth | Login"
            headerLabel="Welcome, Let's Authenticate you"
            backButtonHref="/auth/register"
            backButtonLabel="Don't have an account?"
            showSocial={true}
            showForgotPassword
            forgotPasswordHref="/auth/reset"
        >
            <ShadcnForm.Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4 w-full">
                        {showTwoFactor && (
                            <>
                                <ShadcnForm.FormField
                                    control={form.control}
                                    name="twoFAcode"
                                    render={({ field }) => (
                                        <ShadcnForm.FormItem>
                                            <ShadcnForm.FormLabel>
                                                Two Factor Auth Code
                                            </ShadcnForm.FormLabel>
                                            <ShadcnForm.FormControl>
                                                <Input
                                                    autoComplete="username webauthn"
                                                    disabled={isPending}
                                                    {...field}
                                                    placeholder="123456"
                                                    className="drop-shadow-md"
                                                />
                                            </ShadcnForm.FormControl>
                                            <ShadcnForm.FormMessage />
                                        </ShadcnForm.FormItem>
                                    )}
                                />
                            </>
                        )}
                        {!showTwoFactor && (
                            <>
                                {/* Email Field */}
                                <ShadcnForm.FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <ShadcnForm.FormItem>
                                            <ShadcnForm.FormLabel>Email</ShadcnForm.FormLabel>
                                            <ShadcnForm.FormControl>
                                                <Input
                                                    autoComplete="username webauthn"
                                                    disabled={isPending}
                                                    {...field}
                                                    placeholder="josephngigi775@gmail.com"
                                                    type="email"
                                                    className="drop-shadow-md"
                                                />
                                            </ShadcnForm.FormControl>
                                            <ShadcnForm.FormMessage />
                                        </ShadcnForm.FormItem>
                                    )}
                                />

                                {/* password Field  */}
                                <ShadcnForm.FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <ShadcnForm.FormItem>
                                            <ShadcnForm.FormLabel>Password</ShadcnForm.FormLabel>
                                            <ShadcnForm.FormControl>
                                                <Input
                                                    autoComplete="current-password"
                                                    disabled={isPending}
                                                    {...field}
                                                    placeholder="Password"
                                                    type="password"
                                                    className="drop-shadow-md"
                                                />
                                            </ShadcnForm.FormControl>
                                            <ShadcnForm.FormMessage />
                                        </ShadcnForm.FormItem>
                                    )}
                                />
                            </>
                        )}
                    </div>

                    <Button
                        disabled={isPending}
                        type="submit"
                        className="variant_btn w-full"
                    >
                        {showTwoFactor ? "Confirm 2FA" : "Login"}
                    </Button>
                </form>
            </ShadcnForm.Form>
        </CardWrapper>
    );
};