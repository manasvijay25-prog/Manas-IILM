const checkValidData = (email, password) => {
  // simple, robust email regex (RFC-like but not fully RFC 5322)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // password: minimum 8 chars, at least one lowercase, one uppercase, one digit and one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

  const errors = {};
  if (!email || !emailRegex.test(email)) {
    errors.email = "Invalid email address";
  }
  if (!password || !passwordRegex.test(password)) {
    errors.password =
      "Password must be at least 8 characters and include uppercase, lowercase, number and special character";
  }
const errorMessages = Object.values(errors || {});
if (errorMessages.length === 0) {
  return null;
}
return errorMessages.join('. ');
  
  };
// return a single error message string (or null when valid)

// ✅ FIX: Export the defined variable
export default checkValidData;
