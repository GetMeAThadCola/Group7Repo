import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Account = () => {
  const navigate = useNavigate();
  const { token, logout, isAuthenticated, loading } = useAuth();

  const [userEmail, setUserEmail] = useState(null);
  const [cardName, setCardName] = useState("");
  const [cardLast4, setCardLast4] = useState("");
  const [expiry, setExpiry] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!loading && !token) {
      navigate("/");
    } else if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserEmail(payload.email);
      } catch {
        setUserEmail(null);
      }
    }
  }, [loading, token, navigate]);

  if (loading) return <p style={{ padding: "2rem" }}>Loading account...</p>;

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setMessage("Saving...");

    try {
      const res = await fetch("https://k3qissszlf.execute-api.us-west-2.amazonaws.com/payment-method", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cardName, cardLast4, expiry }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Payment method saved!");
      } else {
        setMessage(data.error || "Failed to save.");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Account Page</h2>
      <p>Welcome back, {userEmail || "Loading..."}</p>

      <button onClick={logout}>Logout</button>

      <hr />
      <h3>Save Payment Method</h3>
      <form onSubmit={handlePaymentSubmit}>
        <input
          type="text"
          placeholder="Cardholder Name"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Card Number"
          maxLength={4}
          value={cardLast4}
          onChange={(e) => setCardLast4(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="MM/YY"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          required
        />
        <button type="submit">Save Payment Method</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Account;
