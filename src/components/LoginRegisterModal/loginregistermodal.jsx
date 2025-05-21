import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import "./loginModal.css";

const LoginRegisterModal = ({ show, onClose }) => {
  const [mode, setMode] = useState("login"); // "login" | "register" | "confirm"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState(""); // confirmation code
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
    setCode("");
    setError("");
    setMessage("");
  }, [mode, show]);

  const handleLogin = async () => {
    try {
      const user = await Auth.signIn(email, password);
      localStorage.setItem("isLoggedIn", "true");
      onClose();
      window.location.reload();
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  const handleRegister = async () => {
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: { email },
      });
      setMode("confirm");
      setMessage("A confirmation code has been sent to your email.");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  const handleConfirmCode = async () => {
    try {
      await Auth.confirmSignUp(email, code);
      setMode("login");
      setMessage("Account confirmed! Please log in.");
    } catch (err) {
      setError(err.message || "Confirmation failed");
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

        {message && <p className="success-msg">{message}</p>}
        {error && <p className="error-msg">{error}</p>}

        {(mode === "login" || mode === "register") && (
          <>
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
          </>
        )}

        {mode === "confirm" && (
          <>
            <input
              type="text"
              placeholder="Enter confirmation code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </>
        )}

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
            <button onClick={handleConfirmCode}>Confirm</button>
            <p>
              Already confirmed?{" "}
              <span onClick={() => setMode("login")}>Login</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginRegisterModal;
