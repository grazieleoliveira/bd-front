import axios from "axios";

export const client = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});
