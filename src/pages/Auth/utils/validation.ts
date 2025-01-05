export const emailPattern = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  message: 'Invalid email address'
};

export const passwordValidation = {
  required: 'Password is required',
  minLength: {
    value: 8,
    message: 'Password must be at least 8 characters'
  }
};

export const requiredField = (fieldName: string) => ({
  required: `${fieldName} is required`
});