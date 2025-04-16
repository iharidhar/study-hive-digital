
import React, { createContext, useState, useContext, useEffect } from 'react';

// Types
type User = {
  id: string;
  name: string;
  email: string;
  institution?: string;
  interests?: string[];
  profilePicture?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
};

// Mock data for demo purposes
const MOCK_USERS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    institution: 'University of Technology',
    interests: ['Computer Science', 'Mathematics'],
    profilePicture: ''
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    institution: 'Science Academy',
    interests: ['Biology', 'Chemistry'],
    profilePicture: ''
  }
];

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Context provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    // Simulating API call with timeout
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(
          (u) => u.email === email && u.password === password
        );
        
        if (foundUser) {
          // Remove password from user object before storing
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          resolve();
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    // Simulating API call with timeout
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const existingUser = MOCK_USERS.find((u) => u.email === email);
        
        if (existingUser) {
          reject(new Error('Email already in use'));
        } else {
          // Create new user
          const newUser = {
            id: `${MOCK_USERS.length + 1}`,
            name,
            email,
            password,
            institution: '',
            interests: [],
            profilePicture: ''
          };
          
          // In a real app, we'd save to the database here
          MOCK_USERS.push(newUser);
          
          // Remove password from user object before storing
          const { password: _, ...userWithoutPassword } = newUser;
          setUser(userWithoutPassword);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          resolve();
        }
      }, 1000);
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // Update user data
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
