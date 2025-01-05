export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  acceptTerms: boolean;
}

export interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isValid?: boolean;
}

export interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export interface AuthCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export interface AuthLayoutProps {
  children: React.ReactNode;
  image: string;
  altText: string;
}