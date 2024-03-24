"use client";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const route = useRouter();
  const [matricule, setMatricule] = useState("");
  const [error, setError] = useState(null);
  const pathName = usePathname();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/auth/signin/medecin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ matricule }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      //   const token = data.access_token;
      Cookies.set("accessToken", data.access_token);
      route.push("/profile");
    } catch (error: unknown) {
      // setError(error);
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
            <Link href={"/login"}>Patient</Link>
          </Button>
          <Button
            className={
              pathName === "/login/medecin"
                ? "bg-sky-500 hover:text-sky-500 hover:bg-white border-sky-500 border-2"
                : "bg-white border-2 border-sky-500 text-sky-500"
            }
          >
            Medecin
          </Button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2">
              Matricule
            </label>
            <input
              type="type"
              id="type"
              name="type"
              placeholder="Matricule"
              value={matricule}
              onChange={(e) => setMatricule(e.target.value)}
              className="w-full p-2 border-2 border-gray-300 rounded"
            />
          </div>
          <div className="mb-6">
            <Button
              className="bg-sky-500 hover:bg-white hover:text-sky-500 hover:border-sky-500 hover:border-2 border-sky-500 border-2"
              type="submit"
            >
              Se connecter
            </Button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </section>
  );
}
