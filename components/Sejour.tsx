/* eslint-disable react/no-unescaped-entities */
"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Cookies from "js-cookie";
import useFetchUserProfile from "@/requests/UserProfile";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Specialite } from "@/types/specialite-type";
import SejourType from "@/types/sejour-type";
import { today } from "@/utils/today";
import { use } from "react";
import { useRouter } from "next/navigation";

export default function Sejour() {
  const specialites = Object.values(Specialite);
  const user = useFetchUserProfile();
  const route = useRouter();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<SejourType>();
  const onSubmit: SubmitHandler<SejourType> = async (data) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        throw new Error("No token found");
      }
      console.log(data);

      const response = await fetch("http://localhost:8000/sejour", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      console.log("Sejour created successfully");
      route.push("/profile");
    } catch (error: unknown) {
      console.error("Error signing in:", error);
      // setError(error);
    }
  };

  return (
    <section className="mt-16">
      <h2 className="text-3xl text-center">Créer votre Sejour</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-screen-md mx-auto [&>div*4] gap-8 flex flex-col items-center justify-center w-full h-full p-4 bg-white rounded-md shadow-md"
      >
        <div>
          <label>Date d'entrée</label>
          <Input
            min={today}
            type="date"
            {...register("dateEntree", { required: true })}
          />
          {errors.dateEntree && (
            <span className="text-red-500">Ce champ est obligatoire</span>
          )}
        </div>

        <div>
          <label>Date de sortie</label>
          <Input
            min={today}
            type="date"
            {...register("dateSortie", { required: true })}
          />
          {errors.dateSortie && (
            <span className="text-red-500">Ce champ est obligatoire</span>
          )}
        </div>

        <div>
          <label>Motif</label>
          <Input type="text" {...register("motif", { required: true })} />
          {errors.motif && (
            <span className="text-red-500">Ce champ est obligatoire</span>
          )}
        </div>

        <div>
          <select
            className="border-2 border-black rounded-md p-2 w-full"
            {...register("specialite", { required: true })}
          >
            <option value="">Choisir une spécialité</option>
            {specialites.map((specialite, key) => (
              <option key={key} value={specialite}>
                {specialite}
              </option>
            ))}
          </select>
          {errors.specialite && (
            <span className="text-red-500">Ce champ est obligatoire</span>
          )}
        </div>

        {user ? (
          <Button type="submit">Enregistrer</Button>
        ) : (
          <Button>
            <Link href="/login">Enregistrer</Link>
          </Button>
        )}
      </form>
    </section>
  );
}
