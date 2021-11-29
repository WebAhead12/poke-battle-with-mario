import React from "react";
import Authenticator from "../../utils/Authentication";
import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!Authenticator.isAccountLogin()) {
      navigate("/authentication");
    }
  }, []);
  return (
    <main>
      <button className="battle">Battle</button>
      <button className="teamBuilder" onClick={() => navigate("/teamBuilder")}>
        Team Builder
      </button>
      <button
        className="logOut"
        onClick={() => {
          Authenticator.logoutAccount();
          navigate("/");
        }}
      >
        Log-Out
      </button>
    </main>
  );
}
