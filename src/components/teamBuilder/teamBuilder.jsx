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
    <main>
      <form>
        <input name="search"></input>
        <img name="pokemonImg" />
        <div className="movesAndDescription">
          <ul className="moves"></ul>
          <div className="description"></div>
        </div>
        <div className="items"></div>
      </form>
    </main>
  );
}
