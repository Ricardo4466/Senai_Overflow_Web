import { api } from "./api";
import jwtDecode from "jwt-decode";

const USER_KEY = "@user";

function readStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    const user = JSON.parse(raw);
    return user && typeof user === "object" ? user : null;
  } catch {
    return null;
  }
}

export const sigIn = (payload) => {
  localStorage.setItem(USER_KEY, JSON.stringify(payload));
  if (payload?.token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${payload.token}`;
  }
};

export const signOut = () => {
  localStorage.removeItem(USER_KEY);
  delete api.defaults.headers.common["Authorization"];
};

export const getUser = () => readStoredUser()?.student ?? null;

export const isSignedIn = () => {
  try {
    const user = readStoredUser();
    if (!user?.token) return false;

    const jwtDecoded = jwtDecode(user.token);
    const nowTime = (Date.now() / 1000) | 0;

    if (jwtDecoded.exp == null || jwtDecoded.exp < nowTime) {
      signOut();
      return false;
    }

    api.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    return true;
  } catch {
    signOut();
    return false;
  }
};

export const setUser = (student) => {
  const user = readStoredUser();
  if (!user) return;
  user.student = student;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};
