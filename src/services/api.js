import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_HOST || "http://localhost:3333/",
  timeout: 30000,
});


