"use client";
import React from "react";


import {useRouter} from "next/navigation";

import {Button} from "@mantine/core";
import {LoginForm} from "./login-form";
import {Dialog, DialogContent, DialogTrigger} from "@/app/components/ui/dialog";
import {T_LAYOUTPROPS} from "@/types.ts/types";
import {useDisclosure} from "@mantine/hooks";

const LoginButton: React.FC<T_LAYOUTPROPS> = ({
                                                  children,
                                                  asChild,
                                                  mode = "redirect",
                                              }) => {
    const router = useRouter();


    const onClick = () => {
        router.push("/auth/login");
    };

    if (mode === "modal") {
        const [opened, { open, close }] = useDisclosure(false);
        return (
            <>
                {/* Модальное окно Mantine */}

                <Dialog opened={opened} setOpened={close}>
                    <DialogTrigger >{children}</DialogTrigger>
                    <DialogContent className="p-0 w-auto bg-transparent border-none text-black">
                        <LoginForm/>
                    </DialogContent>
                </Dialog>
                <Button variant="default" onClick={open}>
                    Open centered Modal
                </Button>
            </>
        );
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
    );
};

export default LoginButton;


