import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json(); // Récupérer les données envoyées depuis le client
    const response = await fetch('http://kahoot.nos-apps.com/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ message: errorData.message }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erreur de serveur' }, { status: 500 });
  }
}

// Récupérer tous les enseignants (GET)
export async function GET(req: NextRequest) {
  try {
    // Récupérer le token depuis l'en-tête de la requête
    const token = req.headers.get('Authorization')?.split(' ')[1]; // "Bearer token"

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
        'Authorization': `Bearer ${token}`, // Ajout du token dans les en-têtes
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

// Mettre à jour un enseignant (PUT)
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await fetch(`http://kahoot.nos-apps.com/api/users/${body.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ message: errorData.message }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erreur lors de la mise à jour de l’enseignant.' }, { status: 500 });
  }
}

// Supprimer un enseignant (DELETE)
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id'); // Récupère l'ID de l'enseignant à supprimer

    if (!id) {
      return NextResponse.json({ message: 'ID de l’enseignant requis.' }, { status: 400 });
    }

    const response = await fetch(`http://kahoot.nos-apps.com/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ message: errorData.message }, { status: response.status });
    }

    return NextResponse.json({ message: 'Enseignant supprimé avec succès.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erreur lors de la suppression de l’enseignant.' }, { status: 500 });
  }
}