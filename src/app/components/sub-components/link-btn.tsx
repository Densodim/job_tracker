'use client'

import React from 'react'
import Link from 'next/link'

import {Button} from "@mantine/core";
import {T_LINKTEXTPROPS} from "@/types.ts/types";


export const LinkButton: React.FC<T_LINKTEXTPROPS> = ({ href, label }) => {
    return (
        <Button variant="link" className='w-full ' size="sm" >
            {href && <Link href={href}>{label}</Link>}
            {!href && <span>{label} (disabled)</span>}
        </Button>
    );
};