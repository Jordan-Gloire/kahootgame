"use client";
import { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import LoadingAndError from "./LoadingAndError";
const TeacherList = () => {
  const [teachers, setTeachers] = useState<any[]>([]); // Etat pour stocker les enseignants
  const [loading, setLoading] = useState(true); // Etat de chargement
  const [error, setError] = useState<string | null>(null); // Etat pour les erreurs
  useEffect(() => {
    const fetchTeachers = async () => {
      const token = localStorage.getItem("token"); // Récupérer le token depuis localStorage

      if (!token) {
        console.log("Token non trouvé");
        setError("Veuillez vous connecter"); // Si pas de token, afficher une erreur
        setLoading(false); // Stopper le chargement
        return;
      }

      try {
        const response = await fetch("/api/addEnseignant", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Envoie le token dans l'en-tête Authorization
          },
        });

        console.log("Statut de la réponse:", response.status); // Ajout d'un log pour vérifier le statut HTTP

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Erreur de récupération des enseignants:", errorText);
          setError("Erreur lors de la récupération des enseignants");
          return;
        }

        const contentType = response.headers.get("Content-Type");
        console.log("Content-Type de la réponse:", contentType); // Afficher le type de la réponse

        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          console.log("Enseignants récupérés:", data);

          if (data.data) {
            setTeachers(data.data); // Assurer que les données sont dans `data.data`
          } else {
            setError("Aucune donnée d'enseignants trouvée");
          }
        } else {
          console.error(
            "La réponse n'est pas en JSON, contenu reçu :",
            await response.text()
          );
          setError("La réponse de l'API n'est pas en JSON");
        }
      } catch (error) {
        console.error("Erreur réseau:", error);
        setError("Erreur réseau. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false); // Arrêter le chargement après la requête
      }
    };

    fetchTeachers();
  }, []);

  if (loading) {
    return;
    <LoadingAndError loading={loading} error={error} />;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Liste des Enseignants
      </h1>
      <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-green-600 text-white text-sm uppercase tracking-wider">
          <tr>
            <th className="px-6 py-3">Nom</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Téléphone</th>
            <th className="px-6 py-3">Statut</th>
            <th className="px-6 py-3">Ecole</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr
              key={teacher._id}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300"
            >
              <td className="px-6 py-4">{teacher.name}</td>
              <td className="px-6 py-4">{teacher.email}</td>
              <td className="px-6 py-4">{teacher.phone}</td>
              <td className="px-6 py-4">{teacher.statut}</td>
              <td className="px-6 py-4">{teacher.ecole}</td>
              <td className="px-6 py-4 flex justify-around gap-2">
                <button
                  className="flex items-center text-green-500 hover:text-green-700 p-2 rounded-md transition-colors"
                  onClick={() => handleViewDetails(teacher._id)}
                >
                  <FaEye className="mr-2" /> Voir
                </button>
                <button
                  className="flex items-center text-yellow-500 hover:text-yellow-700 p-2 rounded-md transition-colors"
                  onClick={() => handleEdit(teacher._id)}
                >
                  <FaEdit className="mr-2" /> Modifier
                </button>
                <button
                  className="flex items-center text-red-500 hover:text-red-700 p-2 rounded-md transition-colors"
                  onClick={() => handleDelete(teacher._id)}
                >
                  <FaTrash className="mr-2" /> Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Fonctions pour les actions (modifier, supprimer, voir les détails)
  function handleViewDetails(id: string) {
    console.log("Voir les détails de l'enseignant:", id);
    // Ici, tu pourrais rediriger ou afficher un modal avec les détails de l'enseignant
  }

  function handleEdit(id: string) {
    console.log("Modifier l'enseignant avec l'ID:", id);
    // Logique de modification ici
  }

  function handleDelete(id: string) {
    console.log("Supprimer l'enseignant avec l'ID:", id);
    // Logique de suppression ici
  }
};

export default TeacherList;
