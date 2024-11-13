// Récupérer tous les enseignants (GET)
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Récupérer le token depuis localStorage côté client
        const token = localStorage.getItem('token');

        if (!token) {
            return NextResponse.json(
                { error: 'Aucun token trouvé. Veuillez vous connecter.' },
                { status: 401 }
            );
        }

        const response = await fetch('http://kahoot.nos-apps.com/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Ajout du token
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                { message: errorData.message },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: 'Erreur lors de la récupération des enseignants.' },
            { status: 500 }
        );
    }
}
