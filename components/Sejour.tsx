"use client";

import Cookies from "js-cookie";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  dateEntree: Date;
  dateSortie: Date;
  motif: string;
  specialite: string;
};

/* eslint-disable react/no-unescaped-entities */
export default function Sejour() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        throw new Error("Access token not found in cookies");
      }
      const response = await fetch("http://localhost:8000/sejour", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        console.log(response);
        throw new Error(
          `Unable to create sejour. Server responded with status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error creating sejour:", error);
    }
  };

  console.log(watch("dateEntree")); // wa
  return (
    <section>
      <h1>Créer votre séjour</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="max-w-screen-md mx-auto [&>div*4] gap-8 flex flex-col items-center justify-center w-full h-full p-4 bg-white rounded-md shadow-md"
      >
        <div>
          <label htmlFor="">Date d'entree</label>
          <Input
            type="datetime-local"
            {...register("dateEntree", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="">Date de sortie</label>
          <Input
            type="datetime-local"
            {...register("dateSortie", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="">Motif</label>
          <Input {...register("motif", { required: true })} />
        </div>
        <div>
          <label htmlFor="">Spécialité</label>
          <Input {...register("specialite", { required: true })} />
        </div>
        <Button type="submit" className="uppercase">
          Créer séjour
        </Button>
      </form>
    </section>
  );
}
