import React from "react";
import Authenticator from "../../utils/Authentication";
import { useNavigate } from "react-router";

export default function TeamBuilder() {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!Authenticator.isAccountLogin()) {
      navigate("/");
    }
  }, []);
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Team Builder</h2>
    </main>
  );
}
