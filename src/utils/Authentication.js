const TOKEN_KEY = "account";
const TOKEN_LOGGED_IN = "logged in";

export const loginAccount = (username, password) => {
  if (!isAccountLogin()) {
    const account = JSON.parse(localStorage.getItem(TOKEN_KEY));
    if (
      account &&
      account.username === username &&
      account.password === password
    ) {
      localStorage.setItem(TOKEN_LOGGED_IN, "true");
      return true;
    }
  }
  return false;
};

export const logoutAccount = () => {
  localStorage.removeItem(TOKEN_LOGGED_IN);
};

export const isAccountLogin = () => {
  return localStorage.getItem(TOKEN_LOGGED_IN) === "true";
};

export const registerAccount = (username, password) => {
  if (isAccountLogin()) return false;
  localStorage.setItem(
    TOKEN_KEY,
    JSON.stringify({ username: username, password: password })
  );
};

export const register = (username, password) => {
  fetch("localhost:4000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      autentication: "Bearer me",
    },
    body: { user: { username: username, password: password } }, // body data type must match "Content-Type" header
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
};

export const login = (username, password) => {
  fetch("localhost:4000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      autentication: "Bearer me",
    },
    body: { user: { username: username, password: password } }, // body data type must match "Content-Type" header
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
};

export default {
  loginAccount,
  logoutAccount,
  isAccountLogin,
  registerAccount,
  register,
};
