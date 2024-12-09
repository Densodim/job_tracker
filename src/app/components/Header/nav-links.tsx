"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { clsx } from "clsx"

const links = [
  { name: "Home", href: "/jobs" },
  {
    name: "Page1",
    href: "/dashboard/invoices",
  },
  { name: "Page2", href: "/dashboard/customers" },
]

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex items-center justify-center gap-2 rounded-md bg-gray-50 px-4 py-2 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 transition duration-150 md:justify-start",
              {
                "bg-sky-100 text-blue-500": pathname === link.href,
              },
            )}
          >
            {link.name}
          </Link>
        )
      })}
    </>
  )
}
