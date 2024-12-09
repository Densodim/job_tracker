import Link from "next/link"

import { auth, signOut } from "@/auth"
import NavLinks from "@/app/components/Header/nav-links"

export default async function SideNav() {
  const session = await auth()

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-4 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <p>{session?.user?.name}</p>
          <p>{session?.user?.email}</p>
        </div>
      </Link>

      {session && (
        <div className="flex flex-rol items-start space-y-2 gap-4">
          <NavLinks />
          <form
            action={async () => {
              "use server"
              await signOut()
            }}
          >
            <button className="flex w-auto items-center justify-center gap-2 rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-150">
              Sign Out
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
