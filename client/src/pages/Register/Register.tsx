import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import { RegisterCredentials } from '../../components/types/auth';

const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Tu Nombre debe tener al menos 2 caracteres')
    .regex(/^[a-zA-Z\s]*$/, 'Tu Nombre solo debe contener letras y espacios'),
  lastName: z
    .string()
    .min(2, 'Tu Apellido debe tener al menos 2 caracteres')
    .regex(/^[a-zA-Z\s]*$/, 'Tu apellido solo debe contener letras y espacios'),
  email: z
    .string()
    .min(1, 'El correo electrónico es obligatorio')
    .email('Por favor ingresa un correo electrónico válido'),
  dni: z
    .string()
    .min(1, 'El DNI es obligatorio')
    .min(8, 'El DNI debe tener al menos 8 caracteres')
    .max(10, 'El DNI no puede exceder los 10 caracteres')
    .regex(/^\d+$/, 'El DNI solo debe contener números'),
  password: z
    .string()
    .min(1, 'La contraseña es obligatoria')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
    .regex(/[a-z]/, 'La contraseñ debe contener al menos una letra minúscula')
    .regex(/[0-9]/, 'La contraseñ debe contener al menos un número')
    .regex(/[@$!%*?&]/, 'La contraseñ debe contener al menos un caracter especial (@$!%*?&)'),
  confirmPassword: z
    .string()
    .min(1, 'Por favor confirma tu contraseña'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ['confirmPassword'],
});

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<RegisterCredentials>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange', // Para validar en tiempo real
  });

  const onSubmit = async (data: RegisterCredentials) => {
    try {
      // TODO: Replace with your API endpoint
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('El registro ha fallado');

      toast.success('El registro ha sido exitoso! Por favor inicia sesión.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      toast.error('El registro ha fallado. Por favor intenta nuevamente.');
    }
  };

  return (
    <AuthLayout title="Crear Cuenta">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="firstName" className="form-label">
              Nombre <span className="text-danger">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              className={`form-control ${touchedFields.firstName && errors.firstName ? 'is-invalid' : ''}`}
              {...register('firstName')}
              placeholder="Ingresa tu Nombre"
            />
            {touchedFields.firstName && errors.firstName && (
              <div className="invalid-feedback">{errors.firstName.message}</div>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="lastName" className="form-label">
              Apellido <span className="text-danger">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              className={`form-control ${touchedFields.lastName && errors.lastName ? 'is-invalid' : ''}`}
              {...register('lastName')}
              placeholder="Ingresa tu Apellido"
            />
            {touchedFields.lastName && errors.lastName && (
              <div className="invalid-feedback">{errors.lastName.message}</div>
            )}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="dni" className="form-label">
            DNI <span className="text-danger">*</span>
          </label>
          <input
            id="dni"
            type="text"
            className={`form-control ${touchedFields.dni && errors.dni ? 'is-invalid' : ''}`}
            {...register('dni')}
            placeholder="Ingresa tu DNI"
          />
          {touchedFields.dni && errors.dni && (
            <div className="invalid-feedback">{errors.dni.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo Electrónico <span className="text-danger">*</span>
          </label>
          <input
            id="email"
            type="email"
            className={`form-control ${touchedFields.email && errors.email ? 'is-invalid' : ''}`}
            {...register('email')}
            placeholder="Ingresa tu correo electrónico"
          />
          {touchedFields.email && errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña <span className="text-danger">*</span>
          </label>
          <input
            id="password"
            type="password"
            className={`form-control ${touchedFields.password && errors.password ? 'is-invalid' : ''}`}
            {...register('password')}
            placeholder="Crea una nueva contraseña"
          />
          {touchedFields.password && errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
          <div className="form-text">
            La contraseña debe contener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, 
            números y caracteres especiales (@$!%*?&).
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirmar Contraseña <span className="text-danger">*</span>
          </label>
          <input
            id="confirmPassword"
            type="password"
            className={`form-control ${touchedFields.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
            {...register('confirmPassword')}
            placeholder="Confirma tu contraseña"
          />
          {touchedFields.confirmPassword && errors.confirmPassword && (
            <div className="invalid-feedback">{errors.confirmPassword.message}</div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-100 mb-3"
        >
          {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>

        <div className="text-center">
          <Link to="/login" className="text-decoration-none">
            Ya tienes una cuenta? Iniciar Sesión
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};