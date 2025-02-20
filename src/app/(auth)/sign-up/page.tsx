"use client";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import useRegister from "@/features/authMutations/useRegister";
import { useRouter } from "next/navigation";
import { IRegisterUser } from "@/types/user.types";
import AuthButton from "@/components/AuthButton";
import Link from "next/link";

const SignUp = () => {
  const { data: session, status } = useSession();
  console.log(session, status);

  const [showPassword, setShowPassword] = useState(false);
  const { register, registerLoading } = useRegister();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: IRegisterUser = {
      userName: formData.get("userName")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
    };
    console.log(data);
    register(data, {
      onSuccess: () => router.push("/sign-in"),
    });
  };

  return (
    <section className="flex flex-col items-center pt-2">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create an account
          </h1>
          <form
            className="space-y-4 md:space-y-4"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="userName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                User Name
              </label>
              <input
                type="text"
                name="userName"
                id="userName"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John Deo"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="JohnDeo@mail.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300"
                >
                  {showPassword ? "👁️" : "🙈"}
                </button>
              </div>
            </div>
            <button
              disabled={registerLoading}
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {registerLoading ? "loading..." : "Sign Up"}
            </button>
          </form>
          <div className="flex items-center justify-between">
            <span className="border-b w-1/2"></span>
            <a href="#" className="text-xs text-center text-gray-500 uppercase">
              or
            </a>
            <span className="border-b w-1/2"></span>
          </div>
          <AuthButton />
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?
            <Link
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              href="/sign-in"
            >
              Sign In here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

//===================================

// "use client";
// import { signIn, signOut, useSession } from "next-auth/react";
// import React from "react";

// const SignUp = () => {
//   const { data: session, status } = useSession();
//   console.log("session:", session, status);
//   return (
//     <div>
//       {session ? (
//         <>
//           <p>Welcome, {session.user?.name}</p>
//           <button onClick={() => signOut()}>Sign Out</button>
//         </>
//       ) : (
//         <button onClick={() => signIn("google")}>Sign In with Google</button>
//       )}
//     </div>
//   );
// };

// export default SignUp;
