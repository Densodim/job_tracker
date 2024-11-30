import type {Metadata} from "next"
import localFont from "next/font/local"
import "./globals.css"
import {createTheme, MantineProvider} from "@mantine/core"
import "@mantine/core/styles.css"
import '@mantine/notifications/styles.css';
import {Providers} from "@/app/providers"
import { Notifications } from '@mantine/notifications';

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
})
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
})

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
}

const theme = createTheme({
    fontFamily: "Open Sans, sans-serif",
    primaryColor: "cyan",
})

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <Providers>

            <MantineProvider theme={theme}>
                <Notifications/>
                    <div className="p-8 max-w-4xl mx-auto">{children}</div>
            </MantineProvider>

        </Providers>
        </body>
        </html>
    )
}
