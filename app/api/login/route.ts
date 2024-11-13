import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        // Envoi de la requête à l'API Laravel pour la connexion
        const response = await axios.post(
            'http://kahoot.nos-apps.com/api/login',
            { email, password },
            { headers: { 'Content-Type': 'application/json' } }
        );

        // Récupérer le jeton d'accès depuis la réponse
        const { token } = response.data;

        // Envoyer le token au client pour qu'il le stocke dans localStorage
        return NextResponse.json({ token }, { status: 200 });
    } catch (error) {
        // Gestion des erreurs
        return NextResponse.json(
            { error: 'Erreur lors de la connexion. Vérifie ton email et ton mot de passe.' },
            { status: 400 }
        );
    }
}

