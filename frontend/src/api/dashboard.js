import { api } from "./index.js"

export const getDashboardStats = () =>
  api("/dashboard/stats")
