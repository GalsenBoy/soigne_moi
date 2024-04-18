/* eslint-disable react/no-unescaped-entities */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFetchUserProfile from "@/requests/UserProfile";
import { Specialite } from "@/types/specialite-type";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  firstName: string;
  lastName: string;
  specialite: Specialite;
  matricule: string;
};

export default function AjouterMedecin() {
  const user = useFetchUserProfile();
  const specialites = Object.values(Specialite);
  const [error, setError] = useState(null);
  const route = useRouter();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/medecin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(
          `Unable to create medecin. Server responded with status: ${response.status}`
        );
      }
      console.log("Medecin créé avec succès", response);
      route.push("/admin");
    } catch (error: any) {
      setError(error.message);
      console.error("Error creating medecin:", error);
    }
  };

  if (user?.role === "admin") {
    return (
      <div>
        <h1 className="text-2xl text-center font-medium my-8">
          Ajouter un médecin
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-screen-md mx-auto [&>div*4] gap-8 flex flex-col items-center justify-center w-full h-full p-4 bg-white rounded-md shadow-md"
        >
          <div>
            <label htmlFor="lastName">Nom</label>
            <Input {...register("lastName", { required: true })} />
            {errors.lastName && (
              <span className="text-red-500">Ce champs est obligatoire</span>
            )}
          </div>
          <div>
            <label htmlFor="firstName">Prénom</label>
            <Input {...register("firstName", { required: true })} />
            {errors.firstName && (
              <span className="text-red-500">Ce champs est obligatoire</span>
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
              <span className="text-red-500">Ce champs est obligatoire</span>
            )}
          </div>
          <div>
            <label htmlFor="matricule">Matricule</label>
            <Input {...register("matricule", { required: true })} />
            {errors.matricule && (
              <span className="text-red-500">Ce champs est obligatoire</span>
            )}
          </div>
          <Button type="submit" className="uppercase">
            Créer médecin
          </Button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    );
  }
}
