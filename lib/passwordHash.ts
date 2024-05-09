import bcrypt from "bcrypt";

async function hashPassword(password: string): Promise<string> {
  "Hashes a password using bcrypt.";
  // Generate a random salt
  const salt = await bcrypt.genSalt(10);
  // Hash the password with the salt
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function comparePassword(
  Password: string,
  hashedPassword: string
): Promise<boolean> {
  "Compares password with hashed password.";
  try {
    return await bcrypt.compare(Password, hashedPassword);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    // Consider throwing a custom error for handling in your application logic
    return false;
  }
}

export { hashPassword, comparePassword };
