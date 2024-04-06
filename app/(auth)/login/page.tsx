/* eslint-disable react/no-unescaped-entities */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const pathName = usePathname();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      const token = data.access_token;

      Cookies.set("accessToken", token);
      route.push("/profile");
    } catch (error: any) {
      setError(error.message);
      console.error("Error signing in:", error);
    }
  };

  return (
    <section>
      <h1 className="text-2xl text-center my-10">Se connecter</h1>
      <div className=" max-w-screen-sm	 mx-auto">
        <div className="mb-6 flex gap-8">
          <Button
            className={
              pathName === "/login"
                ? "bg-sky-500 hover:text-sky-500 hover:bg-white border-sky-500 border-2"
                : "bg-white border-2 border-sky-500 text-sky-500"
            }
          >
            Patient
          </Button>
          <Button
            className={
              pathName === "/login/medecin"
                ? "bg-sky-500 hover:text-sky-500 hover:bg-white border-sky-500 border-2"
                : "bg-white border-2 border-sky-500 text-sky-500"
            }
          >
            <Link href="/login/medecin">Medecin</Link>
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="text-black">
          <Input
            className="mb-4 "
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            className="mt-4 "
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex mt-5 items-center justify-between">
            <Button
              className=" bg-sky-500 hover:text-sky-500 hover:bg-white"
              type="submit"
            >
              SE CONNECTER
            </Button>
            <Link
              className="underline underline-offset-2 text-xl"
              href={"/register"}
            >
              S'incrire
            </Link>
          </div>
        </form>
      </div>
      {error && <p className="text-red-500">{error}</p>}{" "}
    </section>
  );
}
