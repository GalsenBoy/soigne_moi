/* eslint-disable react/no-unescaped-entities */
"use client";
import { Button } from "@/components/ui/button";
import getAllData from "@/requests/GetAll";
import useFetchUserProfile from "@/requests/UserProfile";
import MedecinType from "@/types/medecin-type";
import SejourType from "@/types/sejour-type";
import React from "react";
import Cookies from "js-cookie";
import Link from "next/link";

export default function AdminPage() {
  const [sejours, setSejour] = React.useState<SejourType[] | null>(null);
  const [medecins, setMedecin] = React.useState<MedecinType[] | null>(null);
  const [selectedMedecinId, setSelectedMedecinId] = React.useState<string>("");
  const [error, setError] = React.useState(null);

  const user = useFetchUserProfile();

  const assignerMedecinAuSejour = async (sejourId: string) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`http://localhost:8000/sejour/assign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sejourId: sejourId,
          medecinId: selectedMedecinId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      console.log("successfully assigned doctor to sejour");
      setSelectedMedecinId("");
    } catch (error: any) {
      setError(error.message);
      console.error("Error assigning doctor to sejour:", error);
    }
  };

  React.useEffect(() => {
    getAllData({ endpoint: "sejour", setter: setSejour });
    getAllData({ endpoint: "medecin/limit", setter: setMedecin });
  }, []);

  {
    return user?.roles === "admin" ? (
      <section>
        <h1 className="text-2xl font-semibold text-gray-800">Admin Page</h1>
        <Button className="m-2 bg-gray-600 hover:bg-white hover:text-gray-600">
          <Link href={"/admin/ajouter-medecin"}>Ajouter un médecin</Link>
        </Button>
        <div className="p-4 bg-white shadow-md rounded-md max-w-screen-md mx-auto">
          {sejours?.map((sejour: SejourType) => (
            <div
              key={sejour.id}
              style={{ background: "#71A3D0" }}
              className="mb-4 p-3  shadow-md rounded-lg"
            >
              <span className="text-sm text-gray-600">Date d'entrée</span>
              <p className="text-base font-medium text-gray-800">
                {sejour.dateEntree}
              </p>
              <span className="text-sm text-gray-600">Date de sortie</span>
              <p className="text-base font-medium text-gray-800">
                {sejour.dateSortie}
              </p>
              <span className="text-sm text-gray-600">Motif</span>
              <p className="text-base font-medium text-gray-800">
                {sejour.motif}
              </p>
              <span className="text-sm text-gray-600">Specialité</span>
              <p className="text-base font-medium text-gray-800">
                {sejour.specialite}
              </p>
              <div className="flex gap-3 mt-3">
                <select
                  name=""
                  id=""
                  className="border-2 border-black rounded-md p-2"
                  value={selectedMedecinId}
                  onChange={(e) => setSelectedMedecinId(e.target.value)}
                >
                  <option value="">Choisir un médecin</option>
                  {medecins?.map((medecin: MedecinType) => (
                    <option key={medecin.id} value={medecin.id}>
                      DR. {medecin.lastName} - {medecin.specialite}
                    </option>
                  ))}
                </select>
                <Button
                  className="bg-gray-600 hover:bg-white hover:text-gray-600"
                  onClick={() => assignerMedecinAuSejour(sejour.id)}
                >
                  Assigner à ce médecin
                </Button>
              </div>
            </div>
          ))}
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </section>
    ) : (
      <p>Page non autorisé</p>
    );
  }
}
