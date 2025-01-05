import React from 'react';
import { useForm } from 'react-hook-form';
import { LogIn } from 'lucide-react';
import { LoginCredentials } from '../../types/auth.types';

interface LoginFormProps {
  onSubmit: (data: LoginCredentials) => Promise<void>;
  isLoading?: boolean;
}

export default function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <input
          type="email"
          placeholder="Email"
          {...register('email', {
            required: 'Email requis',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Adresse email invalide'
            }
          })}
          className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-200 outline-none transition-colors focus:border-blue-500"
          disabled={isLoading}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="Mot de passe"
          {...register('password', {
            required: 'Mot de passe requis',
            minLength: {
              value: 8,
              message: 'Le mot de passe doit contenir au moins 8 caractères'
            }
          })}
          className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-200 outline-none transition-colors focus:border-blue-500"
          disabled={isLoading}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <LogIn className="w-5 h-5" />
        )}
        SE CONNECTER
      </button>
    </form>
  );
}