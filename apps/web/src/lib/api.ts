import ky from "ky";

const api = ky.create({
  credentials: "include",
  prefixUrl: "http://localhost:5000/api",
});

export default api;
