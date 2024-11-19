import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "@models/User";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por email
    const user = await User.findOne({
      where: { email },
      attributes: ["id", "password", "name", "email"],
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return; 
    }

    
    const userData = user.get();

    // Comparación de la contraseña 
    // const isMatch = await bcrypt.compare(password, userData.password);
    // if (!isMatch) {
    //   return res.status(401).json({ message: "Incorrect credentials" });
    // }

    
    const isMatch = password === userData.password; // Compara sin cifrado, solo por ejemplo

    if (!isMatch) {
      res.status(401).json({ message: "Incorrect credentials" });
      return; 
    }

    // Generar un token JWT
    const token = jwt.sign({ id: userData.id, email: userData.email }, JWT_SECRET, { expiresIn: "1h" });

    // Responder con el token y datos básicos del usuario
    res.status(200).json({
      message: "login successful",
      token,
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};
