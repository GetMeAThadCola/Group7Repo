import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Account = () => {
  const navigate = useNavigate();
  const { token, logout, isAuthenticated, loading } = useAuth();

  const [userEmail, setUserEmail] = useState(null);
  const [cardName, setCardName] = useState("");
  const [cardLast4, setCardLast4] = useState("");
  const [expiry, setExpiry] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedPaymentMethod, setSavedPaymentMethod] = useState("");

  useEffect(() => {
    if (!loading && !token) {
      navigate("/");
    } else if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const email = payload.email;
        setUserEmail(email);

        // Fetch saved payment method
        fetch(`https://k3qissszlf.execute-api.us-west-2.amazonaws.com/get-profile?email=${email}`)
          .then((res) => res.json())
          .then((data) => {
            if (data?.paymentMethod) {
              setSavedPaymentMethod(data.paymentMethod);
            } else {
              setSavedPaymentMethod("No payment method saved.");
            }
          })
          .catch((err) => {
            console.error("Error fetching profile:", err);
            toast.error("Failed to load saved payment method.");
          });

      } catch {
        setUserEmail(null);
      }
    }
  }, [loading, token, navigate]);

  if (loading) return <p style={{ padding: "2rem" }}>Loading account...</p>;

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!userEmail) {
      toast.error("User email not found.");
      return;
    }

    setSaving(true);
    const paymentMethod = `${cardName} ••••${cardLast4}, Exp: ${expiry}`;

    try {
      const res = await fetch("https://k3qissszlf.execute-api.us-west-2.amazonaws.com/save-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: userEmail, paymentMethod }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Payment method saved.");
        setSavedPaymentMethod(paymentMethod); // update UI after save
      } else {
        toast.error(data.error || "Failed to save payment method.");
      }
    } catch (err) {
      toast.error("Error: " + err.message);
    } finally {
      setSaving(false);
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
          placeholder="Last 4 Digits"
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
        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Payment Method"}
        </button>
      </form>

      {savedPaymentMethod && (
        <div style={{ marginTop: "1rem", fontStyle: "italic" }}>
          Saved: {savedPaymentMethod}
        </div>
      )}
    </div>
  );
};

export default Account;
