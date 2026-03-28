import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const mockUsers = {
  admin: {
    uid: 'admin-001',
    name: 'Admin',
    email: 'admin@reviewhub.com',
    role: 'admin',
    avatar: 'A',
  },
  user: {
    uid: 'user-001',
    name: 'Juan dela Cruz',
    email: 'juan@reviewhub.com',
    role: 'user',
    avatar: 'JC',
    activeProducts: ['subject-1', 'subject-2', 'subject-3'],
  },
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (role) => {
    setCurrentUser(mockUsers[role] || null);
  };

  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{ currentUser, role: currentUser?.role || null, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
