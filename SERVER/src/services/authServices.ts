import { User } from "../models/User"; // Ajusta según tu estructura de archivos
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key"; // Asegúrate de configurar esto correctamente

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export const loginService = async (email: string, password: string): Promise<LoginResponse> => {
  // Buscar al usuario por email
  const user = await User.findOne({
    where: { email },
    attributes: ["id", "password", "name", "email"],
  });

  if (!user) {
    throw new Error("User not found");
  }

  const userData = user.get();

  // Comparar contraseñas (esto debe usar bcrypt en producción)
  const isMatch = password === userData.password; // Usa bcrypt.compare(password, userData.password) en producción
  if (!isMatch) {
    throw new Error("Incorrect credentials");
  }

  // Generar un token JWT
  const token = jwt.sign({ id: userData.id, email: userData.email }, JWT_SECRET, { expiresIn: "1h" });

  return {
    token,
    user: {
      id: userData.id,
      name: userData.name,
      email: userData.email,
    },
  };
};