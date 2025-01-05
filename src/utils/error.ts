export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleFirebaseError(error: unknown): AppError {
  console.error('Firebase error:', error);
  
  if (error instanceof Error) {
    return new AppError(
      'Une erreur est survenue lors de la récupération des données',
      'FIREBASE_ERROR',
      error
    );
  }
  
  return new AppError(
    'Une erreur inattendue est survenue',
    'UNKNOWN_ERROR',
    error
  );
}