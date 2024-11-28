import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import { API_Url } from '../../components/types/authAPI';

const verifyTokenSchema = z.object({
  verificationToken: z
    .string()
    .length(6, 'Verification token must be 6 digits')
    .regex(/^\d+$/, 'Verification token must contain only numbers'),
});

type VerifyTokenForm = z.infer<typeof verifyTokenSchema>;

const VerifyRegister: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state?.initialData;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<VerifyTokenForm>({
    resolver: zodResolver(verifyTokenSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: VerifyTokenForm) => {
    try {
      if (!initialData) {
        toast.error('Datos del registro no encontrados');
        navigate('/register');
        return;
      }

      const completeData = {
        ...initialData,
        verificationToken: data.verificationToken,
      };

      const response = await fetch(`${API_Url}/verifyRegister`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(completeData),
      });

      if (!response.ok) throw new Error('La verficación ha fallado');

      toast.success('Correo Electrónica verificado exitosamente');
      navigate('/register/complete', { state: { initialData, verificationToken: data.verificationToken } });
    } catch (error) {
      console.error(error);
      toast.error('La verificacion ha fallado. Por favor intenta nuevamente');
    }
  };

  if (!initialData) {
    navigate('/register');
    return null;
  }

  return (
    <AuthLayout title="Verifica tu correo electrónico">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="compact-form">
        <div className="row g-2">
          <div className="col-12">
            <div className="text-center mb-3">
              <p className="mb-1">Hemos enviado un correo electrónico a</p>
              <p className="fw-bold mb-0">{initialData.email}</p>
            </div>
          </div>

          <div className="col-12">
            <label htmlFor="verificationToken" className="form-label">
              Código de Verificación <span className="text-danger">*</span>
            </label>
            <input
              id="verificationToken"
              type="text"
              maxLength={6}
              className={`form-control form-control-sm text-center ${
                touchedFields.verificationToken && errors.verificationToken ? 'is-invalid' : ''
              }`}
              {...register('verificationToken')}
              placeholder="Enter 6-digit code"
            />
            {touchedFields.verificationToken && errors.verificationToken && (
              <div className="invalid-feedback">{errors.verificationToken.message}</div>
            )}
            <div className="form-text text-center">
              Por favor ingresa el codigo de verificación que hemos enviado a tu correo electrónico.
            </div>
          </div>

          <div className="col-12 mt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-100 btn-sm"
            >
              {isSubmitting ? 'Verifying...' : 'Verify Email'}
            </button>
          </div>

          <div className="col-12 text-center">
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="btn btn-link text-decoration-none small p-0"
            >
              Regresar a la página de registro
            </button>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default VerifyRegister;