import { NextRequest, NextResponse } from 'next/server'; // Utilisation de NextRequest et NextResponse
import axios from 'axios';

export async function GET(req: NextRequest) {
  try {
    // Vérification que le token est présent dans les headers de la requête
    const token = req.headers.get('authorization')?.split(' ')[1]; // "Bearer token"

    if (!token) {
      return NextResponse.json({ error: 'Token manquant' }, { status: 401 });
    }

    console.log("Token trouvé, envoi de la requête à l'API Laravel");

    // Effectuer la requête à l'API Laravel pour récupérer les données de l'utilisateur
    const response = await axios.get('http://kahoot.nos-apps.com/api/users', {
      headers: {
        Authorization: `Bearer ${token}`, // Envoi du token au backend Laravel
      },
    });

    console.log("Données reçues de l'API Laravel :", response.data);

    // Retourner les données reçues au frontend avec un code 200
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Erreur détaillée :", error);

    // Retourner l'erreur avec un code 500 si une erreur se produit
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données', details: error.message || error },
      { status: 500 }
    );
  }
}
