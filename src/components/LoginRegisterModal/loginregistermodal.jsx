import { useState, useEffect } from "react";
import "./loginModal.css";

const LoginRegisterModal = ({ show, onClose }) => {
  const [mode, setMode] = useState("login"); // "login" or "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
    setError("");
  }, [mode, show]);

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
      setError("Invalid email or password");
      return;
    }
    localStorage.setItem("isLoggedIn", "true");
    onClose();
    window.location.reload();
  };

  const handleRegister = () => {
    const user = { email, password };
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
    onClose();
    window.location.reload();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{mode === "login" ? "Login" : "Register"}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error-msg">{error}</p>}
        {mode === "login" ? (
          <>
            <button onClick={handleLogin}>Login</button>
            <p>
              Don't have an account? <span onClick={() => setMode("register")}>Register</span>
            </p>
          </>
        ) : (
          <>
            <button onClick={handleRegister}>Register</button>
            <p>
              Already have an account? <span onClick={() => setMode("login")}>Login</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginRegisterModal;