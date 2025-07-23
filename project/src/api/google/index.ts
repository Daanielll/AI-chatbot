import apiClient from "../apiClient";

export const updateGoogleCredentials = async (data: any) => {
  const response = await apiClient.post("/google/token", data);
  return response;
};
