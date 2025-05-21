import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

const Account = () => {
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get current authenticated user
    Auth.currentAuthenticatedUser()
      .then(user => {
        const email = user.attributes?.email;
        setUserEmail(email);
      })
      .catch(() => {
        // If not authenticated, redirect
        navigate("/");
      });
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      navigate("/");
      window.location.reload(); // optional: reload to force full UI reset
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Account Page</h2>
      <p>Welcome back, {userEmail}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Account;
