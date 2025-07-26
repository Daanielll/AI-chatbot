import apiClient from "../apiClient";

export const updateGoogleCredentials = async (data: any) => {
  const response = await apiClient.post("/google/token", data);
  return response;
};

export const deleteGoogleCredentials = async (data: any) => {
  const response = await apiClient.delete(`/google/token/${data.chatbot_id}`, {
    data: { ...data },
  });

  return response;
};
