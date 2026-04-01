const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://task-manager-bay-rho-30.vercel.app"
).replace(/\/$/, "");

export { API_BASE_URL };
