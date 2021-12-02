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
  localStorage.removeItem("access_token");
};

export const isAccountLogin = () => {
  return !!localStorage.getItem("access_token");
};

export const registerAccount = (username, password) => {
  if (isAccountLogin()) return false;
  localStorage.setItem(
    TOKEN_KEY,
    JSON.stringify({ username: username, password: password })
  );
};

export const register = (user) => {
  return fetch(`${process.env.REACT_APP_API_URL}/createUser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  }).then((response) => {
    if (!response.ok) throw new Error(response.status);
    return response.json();
  });
};

export const login = (user) => {
  return fetch(`${process.env.REACT_APP_API_URL}/checkUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((response) => {
    if (!response.ok) throw new Error(response.status);
    return response.json();
  });
};

export const getUser = (token) => {
  console.log(token);
  return fetch(`${process.env.REACT_APP_API_URL}/user`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((data) => {
    return data.json();
  });
};

export default {
  loginAccount,
  logoutAccount,
  isAccountLogin,
  registerAccount,
  register,
  login,
  getUser,
};
