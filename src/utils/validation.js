const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isStrongPassword = (password) => {
  return (
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
};

const isValidUrl = (value) => {
  try {
    const url = new URL(value);

    return (
      url.protocol === "http:" ||
      url.protocol === "https:" ||
      url.protocol === "ftp:"
    );
  } catch {
    return false;
  }
};

export const validateLogin = (email, password) => {
  const errors = {};

  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    errors.email = "Email address is required.";
  } else if (!isValidEmail(trimmedEmail)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  }

  return errors;
};

export const validateSignup = (
  firstName,
  lastName,
  email,
  password,
) => {
  const errors = {};

  const trimmedFirstName = firstName.trim();
  const trimmedLastName = lastName.trim();
  const trimmedEmail = email.trim();

  if (!trimmedFirstName) {
    errors.firstName = "First name is required.";
  } else if (trimmedFirstName.length < 4) {
    errors.firstName =
      "First name must be at least 4 characters.";
  } else if (trimmedFirstName.length > 50) {
    errors.firstName =
      "First name cannot exceed 50 characters.";
  }

  if (!trimmedLastName) {
    errors.lastName = "Last name is required.";
  } else if (trimmedLastName.length > 50) {
    errors.lastName =
      "Last name cannot exceed 50 characters.";
  }

  if (!trimmedEmail) {
    errors.email = "Email address is required.";
  } else if (!isValidEmail(trimmedEmail)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (!isStrongPassword(password)) {
    errors.password =
      "Password must contain 8+ characters with uppercase, lowercase, number and special character.";
  }

  return errors;
};

export const validateProfile = ({
  firstName,
  lastName,
  photoUrl,
  age,
  gender,
  about,
}) => {
  const errors = {};

  const trimmedFirstName = firstName.trim();
  const trimmedLastName = lastName.trim();
  const trimmedPhotoUrl = photoUrl.trim();
  const trimmedAbout = about.trim();

  // firstName: required, 4-50 characters
  if (!trimmedFirstName) {
    errors.firstName = "First name is required.";
  } else if (trimmedFirstName.length < 4) {
    errors.firstName =
      "First name must be at least 4 characters.";
  } else if (trimmedFirstName.length > 50) {
    errors.firstName =
      "First name cannot exceed 50 characters.";
  }

  // lastName: optional, maximum 50 characters
  if (trimmedLastName.length > 50) {
    errors.lastName =
      "Last name cannot exceed 50 characters.";
  }

  // photoUrl: backend validates it as URL
  if (!trimmedPhotoUrl) {
    errors.photoUrl = "Profile photo URL is required.";
  } else if (!isValidUrl(trimmedPhotoUrl)) {
    errors.photoUrl =
      "Please enter a valid photo URL.";
  }

  // age: 18-100
  if (age !== "" && age !== null && age !== undefined) {
    const numericAge = Number(age);

    if (!Number.isInteger(numericAge)) {
      errors.age = "Age must be a whole number.";
    } else if (numericAge < 18 || numericAge > 100) {
      errors.age = "Age must be between 18 and 100.";
    }
  }

  // gender: male / female / others
  if (
    gender &&
    !["male", "female", "others"].includes(gender)
  ) {
    errors.gender = "Please select a valid gender.";
  }

  // about: maximum 1000 characters
  if (trimmedAbout.length > 1000) {
    errors.about =
      "About section cannot exceed 1000 characters.";
  }

  return errors;
};