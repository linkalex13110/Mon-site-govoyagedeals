import React from 'react';
import { useForm } from 'react-hook-form';
import { UserPlus } from 'lucide-react';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export default function RegisterForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
  const password = watch('password');

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
    // Implement registration logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            Prénom
          </label>
          <input
            type="text"
            id="firstName"
            {...register('firstName', { required: 'Prénom requis' })}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Nom
          </label>
          <input
            type="text"
            id="lastName"
            {...register('lastName', { required: 'Nom requis' })}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>
      </div>

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

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirmer le mot de passe
        </label>
        <input
          type="password"
          id="confirmPassword"
          {...register('confirmPassword', {
            required: 'Veuillez confirmer votre mot de passe',
            validate: value => value === password || 'Les mots de passe ne correspondent pas'
          })}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="acceptTerms"
          {...register('acceptTerms', {
            required: 'Vous devez accepter les conditions d\'utilisation'
          })}
          className="h-4 w-4 text-blue-600 rounded border-gray-300"
        />
        <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-600">
          J'accepte les conditions d'utilisation et la politique de confidentialité
        </label>
      </div>
      {errors.acceptTerms && (
        <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>
      )}

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
      >
        <UserPlus className="w-5 h-5" />
        Créer un compte
      </button>
    </form>
  );
}