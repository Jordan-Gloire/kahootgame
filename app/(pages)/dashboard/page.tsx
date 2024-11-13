"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddProf from "../../components/AddProf";
import TeacherList from "../../components/TeacherList";
import LoadingAndError from "@/app/components/LoadingAndError";
const Dashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch("/api/dashboard", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Envoi du token à l'API Next.js
          },
        });

        if (!response.ok) {
          throw new Error(
            "Impossible de récupérer les données de l'utilisateur"
          );
        }

        const data = await response.json();
        console.log("msdDonnées", data);

        // Vérifier la structure de `data`
        if (data.data) {
          setUserData(data.data || data);
        } else {
          setError("Les données de l'utilisateur sont manquantes");
        }
      } catch (error: any) {
        setError(error.message || "Erreur lors de la récupération des données");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Supprimer le jeton d'accès
    router.push("/login"); // Redirige vers la page de connexion
  };

  if (loading) {
    <LoadingAndError loading={loading} error={error} />;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <LoadingAndError loading={loading} error={error} />

      {/* Affichage des données de l'utilisateur */}
      {userData && !loading && !error && (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-6">
          <h1 className="text-4xl font-semibold text-gray-800 text-center">
            Bienvenue, {userData.name || "Utilisateur"}!
          </h1>
          <p className="text-lg text-gray-600 text-center">
            Email : {userData.email}
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition-colors"
            >
              Se déconnecter
            </button>
          </div>

          <div className="space-y-6">
            <AddProf />
            {/* <TeacherList /> */}
          </div>
        </div>
      )}
      <TeacherList />
    </div>
  );
};

export default Dashboard;
