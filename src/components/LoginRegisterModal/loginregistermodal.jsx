import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "./loginModal.css";
import { toast } from "react-toastify";

const LoginRegisterModal = ({ show, onClose }) => {
  const [mode, setMode] = useState("login"); // login | register | confirm
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { login, register, confirmSignUp } = useAuth();

  useEffect(() => {
    setEmail("");
    setPassword("");
    setCode("");
    setError("");
    setMessage("");
  }, [mode, show]);

  const handleSubmit = async () => {
    setError("");
    setMessage("");

    if (mode === "register") {
      const result = await register(email, password);
      if (result.success) {
        setMode("confirm");
        setMessage("✅ Code sent to your email. Please confirm.");
        toast.success("Confirmation code sent to your email.");
      } else {
        setError(result.error || "Registration failed.");
        toast.error(result.error);
      }
    } else if (mode === "login") {
      const result = await login(email, password);
      if (result.success) {
        toast.success("🎉 Login successful!");
        setMessage("Login successful.");
        onClose(); // Close the modal smoothly
      } else {
        setError(result.error || "Login failed.");
        toast.error(result.error);
      }
    } else if (mode === "confirm") {
      const result = await confirmSignUp(email, code);
      if (result.success) {
        setMessage("Email confirmed. You can now log in.");
        toast.success("✅ Email confirmed!");
        setMode("login");
      } else {
        setError(result.error || "Confirmation failed.");
        toast.error(result.error);
      }
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>
          {mode === "login"
            ? "Login"
            : mode === "register"
            ? "Register"
            : "Confirm Email"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {(mode === "login" || mode === "register") && (
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        )}

        {mode === "confirm" && (
          <input
            type="text"
            placeholder="Enter Confirmation Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        )}

        {error && <p className="error-msg">{error}</p>}
        {message && <p className="success-msg">{message}</p>}

        <button onClick={handleSubmit}>
          {mode === "login"
            ? "Login"
            : mode === "register"
            ? "Register"
            : "Confirm Code"}
        </button>

        {mode !== "confirm" && (
          <p>
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <span onClick={() => setMode(mode === "login" ? "register" : "login")}>
              {mode === "login" ? "Register" : "Login"}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginRegisterModal;
