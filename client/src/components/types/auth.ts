export interface User {
    id: string;
    firstName: string;
    lastName: string;
    dni: string;
    email: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
    rememberMe: boolean;
  }
  
  export interface RegisterCredentials {
    firstName: string;
    lastName: string;
    dni: string;
    email: string;
    password: string;
    confirmPassword: string;
  }