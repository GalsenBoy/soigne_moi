"use client";
import React, { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      //   localStorage.setItem("accessToken", token);

      // Stockez le jeton d'accès dans un cookie sécurisé
      document.cookie = `accessToken=${token}; path=/; Secure; SameSite=Strict`;
      // Redirigez l'utilisateur vers la page d'accueil ou vers le profil
      window.location.href = "/profile";
    } catch (error: unknown) {
      console.error("Error signing in:", error);
      // setError(error);
    }
  };

  return (
    <div>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit} className="text-black">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign in</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
