// LoginRegisterModal.jsx
import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import "./loginModal.css";

const LoginRegisterModal = ({ show, onClose }) => {
  const [mode, setMode] = useState("login"); // "login", "register", or "confirm"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
    setCode("");
    setMessage("");
    setError("");
  }, [mode, show]);

  const handleRegister = async () => {
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: { email },
        autoSignIn: { enabled: true }, // Optional
      });
      setMessage("Confirmation code sent to your email.");
      setMode("confirm");
    } catch (err) {
      setError(err.message || "Error during registration.");
    }
  };

  const handleConfirm = async () => {
    try {
      await Auth.confirmSignUp(email, code);
      setMessage("Email confirmed! You can now log in.");
      setMode("login");
    } catch (err) {
      setError(err.message || "Error during confirmation.");
    }
  };

  const handleLogin = async () => {
    try {
      const user = await Auth.signIn(email, password);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", user.attributes.email);
      onClose();
      window.location.reload();
    } catch (err) {
      setError("Login failed: " + (err.message || "Unknown error"));
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
        />

        {(mode === "login" || mode === "register") && (
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        {mode === "confirm" && (
          <input
            type="text"
            placeholder="Confirmation Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        )}

        {error && <p className="error-msg">{error}</p>}
        {message && <p className="success-msg">{message}</p>}

        {mode === "login" && (
          <>
            <button onClick={handleLogin}>Login</button>
            <p>
              Don't have an account?{" "}
              <span onClick={() => setMode("register")}>Register</span>
            </p>
          </>
        )}

        {mode === "register" && (
          <>
            <button onClick={handleRegister}>Register</button>
            <p>
              Already have an account?{" "}
              <span onClick={() => setMode("login")}>Login</span>
            </p>
          </>
        )}

        {mode === "confirm" && (
          <>
            <button onClick={handleConfirm}>Confirm Code</button>
            <p>
              Need to log in?{" "}
              <span onClick={() => setMode("login")}>Login</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginRegisterModal;
