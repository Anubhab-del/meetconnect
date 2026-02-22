export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePassword = (password) => password.length >= 6;

export const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

export const validateName = (name) => name.trim().length >= 2;

export const validateLoginForm = ({ email, password }) => {
  const errors = {};
  if (!email) errors.email = 'Email is required';
  else if (!validateEmail(email)) errors.email = 'Enter a valid email';
  if (!password) errors.password = 'Password is required';
  else if (!validatePassword(password)) errors.password = 'Password must be at least 6 characters';
  return errors;
};

export const validateRegisterForm = ({ name, email, password, contactNumber }) => {
  const errors = {};
  if (!name) errors.name = 'Name is required';
  else if (!validateName(name)) errors.name = 'Name must be at least 2 characters';
  if (!email) errors.email = 'Email is required';
  else if (!validateEmail(email)) errors.email = 'Enter a valid email';
  if (!password) errors.password = 'Password is required';
  else if (!validatePassword(password)) errors.password = 'Password must be at least 6 characters';
  if (!contactNumber) errors.contactNumber = 'Contact number is required';
  else if (!validatePhone(contactNumber)) errors.contactNumber = 'Enter a valid 10-digit number';
  return errors;
};