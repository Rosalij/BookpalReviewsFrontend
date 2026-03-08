//user interface
export interface User {
    _id: string;
    username: string;
    email: string;
}
//Login Credentials
export interface LoginCredentials {
    email: string;
    password: string;
};

//Authentication response
export interface AuthResponse {
    user: User;
    token: string;
}
// Authentication context type
export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

