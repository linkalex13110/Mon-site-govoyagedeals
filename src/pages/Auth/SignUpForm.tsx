import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AuthInput from './components/AuthInput';
import AuthButton from './components/AuthButton';
import AuthCheckbox from './components/AuthCheckbox';

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  acceptTerms: boolean;
}

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields }
  } = useForm<SignUpFormData>();

  const onSubmit = (data: SignUpFormData) => {
    console.log(data);
    // Implement signup logic
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">SIGN UP NOW</h1>
        <p className="text-gray-600 mt-2">to share your adventures & follow others</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AuthInput
          label="First Name"
          {...register('firstName', { required: 'First name is required' })}
          error={errors.firstName?.message}
          isValid={dirtyFields.firstName && !errors.firstName}
        />

        <AuthInput
          label="Last Name"
          {...register('lastName', { required: 'Last name is required' })}
          error={errors.lastName?.message}
          isValid={dirtyFields.lastName && !errors.lastName}
        />

        <AuthInput
          type="email"
          label="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          error={errors.email?.message}
          isValid={dirtyFields.email && !errors.email}
        />

        <AuthInput
          type="password"
          label="Choose a Password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters'
            }
          })}
          error={errors.password?.message}
          isValid={dirtyFields.password && !errors.password}
        />

        <div className="pt-4">
          <AuthCheckbox
            label="I agree to the terms & conditions"
            {...register('acceptTerms', {
              required: 'You must accept the terms and conditions'
            })}
          />
          {errors.acceptTerms && (
            <p className="mt-1 text-sm text-red-500">{errors.acceptTerms.message}</p>
          )}
        </div>

        <AuthButton type="submit">LET'S GO</AuthButton>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/auth/login" className="font-medium text-black hover:underline">
            LOGIN
          </Link>
        </p>
      </div>
    </div>
  );
}