import { useState, useEffect } from 'react';

function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  const login = (email, password) => {
    // Simulate login and token generation (mock token for demo)
    const fakeToken = `${email}-fake-token`; // Replace with real JWT logic
    localStorage.setItem('token', fakeToken);
    setToken(fakeToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // Optional: Automatically log in the user if token exists
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return { token, login, logout };
}

export default useAuth;
