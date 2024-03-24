/* eslint-disable react/no-unescaped-entities */
"use client";
import useFetchUserProfile from "@/requests/UserProfile";
import SejourType from "@/types/sejour-type";
import React from "react";
import Cookies from "js-cookie";
import { today } from "@/utils/today";

const Profile = () => {
  const user = useFetchUserProfile();
  const [sejours, setSejour] = React.useState<SejourType[] | null>(null);

  const getUserSejour = async () => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch("http://localhost:8000/sejour/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      setSejour(await response.json());
    } catch (error) {
      console.error("Error getting sejour:", error);
    }
  };
  React.useEffect(() => {
    getUserSejour();
  }, []);
  return (
    <div className="relative">
      {/* <h1 className="text-2xl font-semibold text-gray-800">Profile</h1> */}
      {user && (
        <div className="flex">
          <div className=" w-1/4 p-2" style={{ background: "#71A3D0" }}>
            <p className="text-2xl font-medium uppercase">{user.firstName}</p>
            <p className="uppercase text-lg">{user.lastName}</p>
            <p className="font-medium"> {user.email}</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded-md w-3/5">
            <h1 className="text-2xl font-semibold text-gray-800 my-8 underline-offset-2 underline">
              Mes sejours
            </h1>
            {sejours?.map((sejour: SejourType) => (
              <div key={sejour.id}>
                {today >= sejour.dateEntree && today <= sejour.dateSortie && (
                  <div className="text-green-500 font-semibold text-lg">
                    <h3>Séjour en cours</h3>
                  </div>
                )}
                {today < sejour.dateSortie && today < sejour.dateEntree && (
                  <div className="text-gray-500 font-semibold text-lg">
                    <h3> Séjour à venir</h3>
                  </div>
                )}
                {today > sejour.dateSortie && today > sejour.dateEntree && (
                  <div className="text-red-500 font-semibold text-lg">
                    <h3> Séjour terminé</h3>
                  </div>
                )}
                <div
                  style={{ background: "#71A3D0" }}
                  className="mb-4 p-3  shadow-md rounded-lg"
                >
                  <div className="text-sm text-gray-600">Date d'entrée:</div>
                  <p className="text-base font-medium text-gray-800">
                    {sejour.dateEntree}
                  </p>
                  <div className="text-sm text-gray-600">Date de sortie:</div>
                  <p className="text-base font-medium text-gray-800">
                    {sejour.dateSortie}
                  </p>
                  <div className="text-sm text-gray-600">Motif:</div>
                  <p className="text-base font-medium text-gray-800">
                    {sejour.motif}
                  </p>
                  <div className="text-sm text-gray-600">Spécialité:</div>
                  <p className="text-base font-medium text-gray-800">
                    {sejour.specialite}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
