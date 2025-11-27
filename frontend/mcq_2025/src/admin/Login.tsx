import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../utils/api";

const AdminLogin: React.FC = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const nav = useNavigate();

  const login = async () => {
    try {
      const res = await adminLogin({ username: user, password: pass });
      // store token and redirect (demo)
      localStorage.setItem("admin_token", res.data.token);
      nav("/admin/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="container">
      <h2>Admin Login</h2>
      <input placeholder="username" value={user} onChange={e => setUser(e.target.value)} />
      <input placeholder="password" value={pass} type="password" onChange={e => setPass(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
};

export default AdminLogin;
