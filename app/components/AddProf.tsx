"use client";

import { useState } from "react";
import Link from "next/link";

export default function AddEnseignantForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    statut: "",
    password: "",
    ecole: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/addEnseignant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Une erreur est survenue.");
        return;
      }

      setSuccess("Enseignant ajouté avec succès !");
      setFormData({
        name: "",
        email: "",
        phone: "",
        statut: "",
        password: "",
        ecole: "",
      });
    } catch (err) {
      setError("Erreur réseau. Veuillez réessayer.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Ajouter un Enseignant</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Grid layout for fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Nom
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium">
              Téléphone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="statut" className="block text-sm font-medium">
              Statut
            </label>
            <input
              type="text"
              id="statut"
              name="statut"
              value={formData.statut}
              onChange={handleChange}
              placeholder="Entrez le statut (e.g., Enseignant)"
              className="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="ecole" className="block text-sm font-medium">
              ID École
            </label>
            <input
              type="text"
              id="ecole"
              name="ecole"
              value={formData.ecole}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              placeholder="ID de l'école (lié à l'inscription)"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600"
        >
          Ajouter
        </button>
      </form>
      <div className="mt-4">
        <Link href="/dashboard" className="text-blue-500 hover:underline">
          Voir tous les enseignants
        </Link>
      </div>
    </div>
  );
}
