"use client";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  zipCode: string;
};

export default function App() {
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
      window.location.href = "/login";
    } catch (error) {
      console.error("Error registering user:", error);
      window.location.href = "/register";
    }
  };

  console.log(watch("firstName")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input {...register("firstName", { required: true })} />
      <input {...register("lastName", { required: true })} />
      <input type="email" {...register("email", { required: true })} />
      <input type="password" {...register("password", { required: true })} />
      <input {...register("zipCode", { required: true })} />
      {/* include validation with required or other standard HTML validation rules */}

      {/* errors will return when field validation fails  */}
      {/* {errors.exampleRequired && <span>This field is required</span>} */}

      <input type="submit" />
    </form>
  );
}
