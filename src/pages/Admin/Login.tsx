import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoginForm from '../../components/auth/LoginForm';
import { LoginCredentials } from '../../types/auth.types';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [error, setError] = useState<string>('');

  const handleSubmit = async (data: LoginCredentials) => {
    try {
      setError('');
      await login(data);
      navigate('/admin');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur de connexion');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:block relative">
        <img
          src="https://images.unsplash.com/photo-1491466424936-e304919aada7?auto=format&fit=crop&q=80"
          alt="Mountain peak at sunset"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-2xl font-bold">Administration</h2>
            <p className="mt-2 text-gray-600">
              Connectez-vous pour accéder à votre espace
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}