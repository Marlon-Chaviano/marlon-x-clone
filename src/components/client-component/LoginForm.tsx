"use client";
import React, { useState } from "react";
import Spinner from "../ui/spinner";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { login } from "@/app/login/actions";

const LoginForm = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  type UserData = {
    email: string;
    password: string;
  };

  type data = {
    user: {};
  };

  async function handleSubmit({ email, password }: UserData) {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const res = await login(formData)
      .then(() => {
        toast.success("Login successfully");
        setSuccess(true)
      })
      .catch((e) => toast.error(e as string))
      .finally(() => setIsLoading(false));
  }

  return (
    <form
      className="mt-4 p-6 max-w-[450px] flex flex-col space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(user);
      }}
    >
      <div>
        <p className="text-2xl tracking-wide font-extrabold">LogIn</p>
      </div>
      <div className="p-2 flex flex-col space-y-4">
        <Input
          className={`bg-black ${
            !user.email.includes("@")
              ? "focus:border-red-600"
              : "focus:border-primary"
          }
             ${
               user.email.indexOf(".") == -1
                 ? "focus:border-red-600"
                 : "focus:border-primary"
             }
             border-gray-800 py-4 w-full px-6 rounded-none  focus:border-2  placeholder:text-gray-500`}
          placeholder="Email"
          name="email"
          autoComplete="off"
          type="email"
          required
          onChange={(e) => {
            setUser({
              ...user,
              email: e.target.value,
            });
          }}
        />

        <Input
          className={`bg-black border-gray-800 ${
            user.password.length < 4
              ? "focus:border-red-600 focus:border-2"
              : "focus:border-primary focus:border-2"
          } py-4 w-full px-6 rounded-none    placeholder:text-gray-500`}
          name="password"
          required
          type="password"
          autoComplete="off"
          placeholder="password"
          onChange={(e) => {
            setUser({
              ...user,
              password: e.target.value,
            });
          }}
        />

        {!success ? (
          <button
            type="submit"
            disabled={
              user.email.length < 5 || user.password.length < 4 || isLoading
            }
            className={`hover:opacity-85 transition ${
              isLoading && "hover:opacity-100"
            } flex justify-center items-center duration-200 w-full rounded-full py-2 font-extrabold text-md bg-gray-400 text-gray-700 text-center ${
              user.email.length > 4 &&
              user.email.includes("@") &&
              user.email.includes(".") &&
              "bg-white  text-gray-900"
            }`}
          >
            {isLoading ? <Spinner /> : "Siguiente"}
          </button>
        ) : (
          <div className="w-full p-2 text-center rounded-lg bg-green-700/20">
            <p className="text-green-600 text-md font-bold">
              You will be redirected in a few seconds
            </p>
          </div>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
