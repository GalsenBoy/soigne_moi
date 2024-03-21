/* eslint-disable react/no-unescaped-entities */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFetchUserProfile from "@/requests/UserProfile";
import { Specialite } from "@/types/specialite-type";
import { useRouter } from "next/navigation";
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
    } catch (error) {
      console.error("Error creating medecin:", error);
    }
  };

  if (user && (user as any).roles === "admin") {
    return (
      <div>
        <h1>Ajouter un médecin</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-screen-md mx-auto [&>div*4] gap-8 flex flex-col items-center justify-center w-full h-full p-4 bg-white rounded-md shadow-md"
        >
          <div>
            <label htmlFor="lastName">Nom</label>
            <Input {...register("lastName", { required: true })} />
          </div>
          <div>
            <label htmlFor="firstName">Prénom</label>
            <Input {...register("firstName", { required: true })} />
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
          </div>
          <div>
            <label htmlFor="matricule">Matricule</label>
            <Input {...register("matricule", { required: true })} />
          </div>
          <Button type="submit" className="uppercase">
            Créer médecin
          </Button>
        </form>
      </div>
    );
  }
  return route.push("/");
}
