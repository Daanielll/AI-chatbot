import { AgentType } from "@/types/agent";
import apiClient from "../apiClient";

export const getAgents = async () => {
  const response = await apiClient.get("/bots");
  return response;
};

export const createAgent = async (data: Partial<AgentType>) => {
  const response = await apiClient.post("/bots", data);
  return response;
};
