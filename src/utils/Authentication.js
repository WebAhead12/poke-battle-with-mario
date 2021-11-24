const TOKEN_KEY = "account";
const TOKEN_LOGGED_IN = "logged in";

export const loginAccount = (username, password) => {
  if (!isAccountLogin()) {
    const account = JSON.parse(localStorage.getItem(TOKEN_KEY));
    if (account.username == username && account.password == password) {
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
  return localStorage.getItem(TOKEN_LOGGED_IN) == "true";
};

export const registerAccount = (username, password) => {
  if (isAccountLogin()) return false;
  localStorage.setItem(
    TOKEN_KEY,
    JSON.stringify({ username: username, password: password })
  );
};

export default { loginAccount, logoutAccount, isAccountLogin, registerAccount };
