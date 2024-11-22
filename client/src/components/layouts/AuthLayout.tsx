import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div className="text-center mb-4">
              <h2 className="mt-3 fw-bold">{title}</h2>
            </div>
            <div className="card shadow-sm">
              <div className="card-body p-4 p-md-5">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};