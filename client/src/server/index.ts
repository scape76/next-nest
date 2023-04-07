import axios from "axios";

export const baseURL = "http://localhost:4000";

const $api = axios.create({
  withCredentials: true,
  baseURL,
});

$api.defaults.headers.common["SameSite"] = "None";
$api.defaults.headers.common["Secure"] = true;

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error.response.status)
    console.log(error.config)
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(`${baseURL}/auth/refresh`, {
          withCredentials: true,
        });
        console.log(response)
        localStorage.setItem("token", response.data.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log("Not authorized");
      }
    }
    throw error;
  }
);

export default $api;
