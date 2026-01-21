import { createContext, useContext, useEffect, useMemo, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL; // ต้องเป็นโดเมนล้วน (ไม่มี /api)
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const setSession = (nextToken, nextUser) => {
    localStorage.setItem("token", nextToken);
    setToken(nextToken);
    setUser(nextUser);
  };

  const fetchMe = async (tkn) => {
    if (!tkn) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/users/me`, {
        headers: { Authorization: `Bearer ${tkn}` },
      });
      const json = await res.json();

      if (!res.ok) throw new Error(json?.message || "Failed to load profile");
      setUser(json.data || json.user || json); // กันรูปแบบ response ต่างๆ
    } catch (e) {
      logout(); // token พัง/หมดอายุ -> เคลียร์
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({ token, user, loading, setSession, logout, refreshMe: () => fetchMe(token) }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
