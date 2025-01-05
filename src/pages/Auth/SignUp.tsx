import React from 'react';
import AuthLayout from './components/AuthLayout';
import SignUpForm from './SignUpForm';

export default function SignUp() {
  return (
    <AuthLayout
      image="https://images.unsplash.com/photo-1491466424936-e304919aada7?auto=format&fit=crop&q=80"
      altText="Mountain peak at sunset"
    >
      <SignUpForm />
    </AuthLayout>
  );
}