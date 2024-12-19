import React from "react"
import LoginForm from "@/app/components/LoginForm"

import LoginButton from "@/app/components/auth/login-btn";
import {Separator} from "@/app/components/ui/separator";

export default function Home() {
  return (
      <>
          {/* <div className="flex flex-col items-center justify-center w-full">*/}
          {/* <h1>*/}
          {/* Для входа введите любой email(например email@email.com) и пароль 6 цифр*/}
          {/*</h1>*/}
          {/* <LoginForm/>*/}
          {/* </div>*/}


          <main
              className="dark:bg-black  flex-c-center h-[650px] shadow-xl rounded-xl  bg-slate-100 max-w-[650px] p-5 mx-auto">
              <div className="space-y-6 text-center h-[400px] flex-between flex-col">
                  <div>
                      <h1 className="head_text">Next Auth</h1>
                      <Separator className="bg-slate-800 w-[600px]"/>
                      <LoginButton mode="modal">
                          Welcome to Next-Auth
                      </LoginButton>
                  </div>

                  <div className="text-start">
                      <p className="text-sm text-start">
                          I currently don&apos;t have a domain, so that does not allow a new user
                          to register. In the future I will update to use a domain. This
                          project is a full authentication process in next js, implementing{" "}
                          <a
                              className="text-emerald-500 hover:underline duration-300 transition-all"
                              href="https://authjs.dev/guides/upgrade-to-v5"
                              target="_blank"
                          >
                              next.js Version 5 (Beta)
                          </a>{" "}
                          at the time of implementation.
                      </p>

                      <p className="text-sm text-start mt-3">
                          Source Code:{" "}
                          <a
                              className="text-emerald-500 hover:underline duration-300 transition-all"
                              href="https://github.com/joe-jngigi/next_auth_V5"
                              target="_blank"
                          >
                              Github (Next Auth Version 5 )
                          </a>
                      </p>
                      <div className="mt-5 w-full">
                          <div>
                              <h2 className="text-start text-sm font-semibold">
                                  Features Impemented
                              </h2>
                              <div className="flex items-center flex-wrap flex-row gap-3 mt-3">
                <span className="text-xs p-2 dark:bg-slate-900 bg-white rounded-full cursor-pointer">
                  Auth.js v5
                </span>
                                  <span className="text-xs p-2 dark:bg-slate-900 bg-white rounded-full cursor-pointer">
                  Sign In OTP
                </span>
                                  <span className="text-xs p-2 dark:bg-slate-900 bg-white rounded-full cursor-pointer">
                  Reset Password by email
                </span>
                                  <span className="text-xs p-2 dark:bg-slate-900 bg-white rounded-full cursor-pointer">
                  Two-Factor-Authentication
                </span>
                                  <span className="text-xs p-2 dark:bg-slate-900 bg-white rounded-full cursor-pointer">
                  Credentials, Google and Github
                </span>
                                  <span className="text-xs p-2 dark:bg-slate-900 bg-white rounded-full cursor-pointer">
                  User Role gate: Admin | User
                </span>
                                  <span className="text-xs p-2 dark:bg-slate-900 bg-white rounded-full cursor-pointer">
                  User Settings Control
                </span>
                              </div>

                              {/*<ProjectText/>*/}
                          </div>
                      </div>
                  </div>
              </div>
          </main>

      </>
  )
}
