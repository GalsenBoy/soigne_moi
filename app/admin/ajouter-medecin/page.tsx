/* eslint-disable react/no-unescaped-entities */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFetchUserProfile from "@/requests/UserProfile";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  firstName: string;
  lastName: string;
  specialite: string;
  matricule: string;
};

export default function AjouterMedecin() {
  const user = useFetchUserProfile();
  // console.log(user);
  const {
    register,
    handleSubmit,
    watch,
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
        console.log(response);
        throw new Error(
          `Unable to create medecin. Server responded with status: ${response.status}`
        );
      }
      console.log("Medecin créé avec succès", response);
    } catch (error) {
      console.error("Error creating medecin:", error);
    }
  };

  // console.log(watch("firstName")); // watch input value by passing the name of it

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
            <label htmlFor="specialite">Spécialité</label>
            <Input {...register("specialite", { required: true })} />
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
  return <h1>Vous n'avez pas les droits pour accéder à cette page</h1>;
}
