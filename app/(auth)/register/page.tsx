/* eslint-disable react/no-unescaped-entities */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  zipCode: string;
};

export default function Register() {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Unable to register user");
      }
      route.push("/login");
      console.log("User registered successfully");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <section>
      <h1 className="text-center text-2xl my-10">S'inscrire</h1>
      <div className=" max-w-screen-sm mx-auto my-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Prénom"
            className="mb-4 "
            {...register("firstName", { required: true })}
          />
          <Input
            placeholder="Nom"
            className="mb-4 "
            {...register("lastName", { required: true })}
          />
          <Input
            placeholder="Email"
            className="mb-4 "
            type="email"
            {...register("email", { required: true })}
          />
          <Input
            placeholder="Mot de passe"
            className="mb-4 "
            type="password"
            {...register("password", { required: true })}
          />
          <Input
            placeholder="Code postal"
            className="mb-4 "
            {...register("zipCode", { required: true })}
          />

          <Button
            className="bg-sky-500 hover:text-sky-500 hover:bg-white border border-sky-500 mt-4 "
            type="submit"
          >
            S'INSCRIRE
          </Button>
        </form>
      </div>
    </section>
  );
}
