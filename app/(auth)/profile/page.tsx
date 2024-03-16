"use client";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Récupérez le cookie contenant le jeton d'accès
        const cookies = document.cookie
          .split(";")
          .map((cookie) => cookie.trim());
        const accessTokenCookie = cookies.find((cookie) =>
          cookie.startsWith("accessToken=")
        );
        if (!accessTokenCookie) {
          throw new Error("Access token not found in cookies");
        }
        const token = accessTokenCookie.split("=")[1];

        // Envoyez une demande au backend pour récupérer le profil de l'utilisateur
        const response = await fetch("http://localhost:8000/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Unable to fetch user profile");
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // Rediriger l'utilisateur vers la page de connexion en cas d'erreur
        window.location.href = "/login";
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    // Supprimez le cookie contenant le jeton d'accès
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Redirigez l'utilisateur vers la page de connexion
    window.location.href = "/login";
  };

  return (
    <div>
      <h1>User Profile</h1>
      {user && (
        <div>
          <p>Email: {(user as any).email}</p>
          <p>Prénom : {(user as any).firstName}</p>
          {/* Afficher d'autres informations de l'utilisateur ici */}
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
