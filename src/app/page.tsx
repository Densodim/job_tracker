

import React from "react";
import {redirect} from "next/navigation";



export default function Home() {
  redirect("/jobs")
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1>Page home</h1>
    </div>
  )
}
