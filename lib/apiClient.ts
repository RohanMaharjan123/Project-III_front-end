import axios from "axios"

const apiClient = axios.create({
  // Make sure to set this environment variable in your .env.local file
  // e.g., NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor to include the auth token in every request.
// The token is retrieved from localStorage, where your AuthContext likely stores it upon login.
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

export { apiClient }