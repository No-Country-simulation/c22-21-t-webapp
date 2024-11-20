import nodemailer from "nodemailer";
import { envs } from "@config/envs";

// Variables para construir mensaje del email
interface messageAttributes {
  name: string;
  email: string;
  token: string;
}

// Inicializar conexión con el servicio SMTP
const transporter = nodemailer.createTransport({
  host: envs.SMTP_HOST,
  port: envs.SMTP_PORT,
  secure: process.env.NODE_ENV === "production" ? true : false,
  auth: {
    user: envs.SMTP_USER,
    pass: envs.SMTP_PASSWORD,
  },
});

/* Crear y enviar mensaje de verificación al email del usuario */
export const sendOTPtoEmail = async ({
  name,
  email,
  token,
}: messageAttributes) => {
  // Formar y enviar mensaje
  const fromEmail = "noreply.bankiapp@gmail.com";
  const _ = await transporter.sendMail({
    from: fromEmail,
    to: email,
    subject: "[Banki] Verificación de cuenta",
    html: `
    <html>
        <body>
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2>¡Hola ${name}!</h2>
                <p>Gracias por registrarte en Banki. Para completar el proceso de registro, por favor ingresa el siguiente código de verificación:</p>
                <div style="background-color: #f8f8f8; padding: 10px 15px; border: 1px solid #ddd; font-size: 18px; font-weight: bold; display: inline-block; margin-bottom: 20px;">
                    ${token}
                </div>
                <p>Este código es válido solo por 10 minutos. Si no solicitaste este registro, por favor ignora este correo.</p>
                <p>¡Bienvenido a Banki!</p>
                <footer style="margin-top: 20px; font-size: 12px; color: gray; text-align: center;">
                    <p>Saludos,<br>El equipo de Banki</p>
                </footer>
            </div>
        </body>
    </html>
    `,
  });
};
