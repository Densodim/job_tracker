"use client";

import React from "react";

import {TLAYOUT_CARDWRAPPER_EXTENDS} from "@/types.ts/types";
import {Card, CardContent, CardFooter, CardHeader} from "@/app/components/ui/card";
import {AuthHeader} from "@/app/components/sub-components/auth_header";
import {SocialInfo} from "@/app/components/sub-components/social-info";
import {LinkButton} from "@/app/components/sub-components/link-btn";


const CardWrapper: React.FC<TLAYOUT_CARDWRAPPER_EXTENDS> = ({
                                                                children,
                                                                backButtonHref,
                                                                backButtonLabel,
                                                                headerLabel,
                                                                headerTitle,
                                                                showSocial,
                                                                showForgotPassword,
                                                                forgotPasswordHref,
                                                            }) => {
    return (
        <Card className="w-[500px]">
            <CardHeader>
                <AuthHeader label={headerLabel} title={headerTitle} />
            </CardHeader>

            <CardContent>{children}</CardContent>

            {showSocial && (
                <CardFooter>
                    <SocialInfo />
                </CardFooter>
            )}

            <CardFooter>
                <LinkButton label={backButtonLabel} href={backButtonHref} />
                {showForgotPassword && (
                    <LinkButton label="Forgot Password?" href={forgotPasswordHref} />
                )}
            </CardFooter>
        </Card>
    );
};

export default CardWrapper;