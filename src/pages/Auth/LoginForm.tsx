import React from 'react';
import { useForm } from 'react-hook-form';
import { LogIn } from 'lucide-react';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    // Implement login logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email requis',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Adresse email invalide'
            }
          })}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          {...register('password', {
            required: 'Mot de passe requis',
            minLength: {
              value: 8,
              message: 'Le mot de passe doit contenir au moins 8 caractères'
            }
          })}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            {...register('rememberMe')}
            className="h-4 w-4 text-blue-600 rounded border-gray-300"
          />
          <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
            Se souvenir de moi
          </label>
        </div>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
          Mot de passe oublié ?
        </a>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
      >
        <LogIn className="w-5 h-5" />
        Se connecter
      </button>
    </form>
  );
}