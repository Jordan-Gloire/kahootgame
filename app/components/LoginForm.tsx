"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;

        // Stocker le token dans localStorage
        localStorage.setItem("authToken", token);

        // Redirection vers la page dashboard
        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Erreur de connexion.");
      }
    } catch (err) {
      setError("Erreur réseau. Réessayez plus tard.");
    }
  };

  return (
    <div className="mt-20">
      <h2 className="text-center text-3xl font-extrabold text-gray-900">
        Se connecter
      </h2>
      <form className="mt-8 space-y-6" onSubmit={handleLogin}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Mot de passe"
            />
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center mt-4">
            <p>{error}</p>
          </div>
        )}

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Connexion
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
