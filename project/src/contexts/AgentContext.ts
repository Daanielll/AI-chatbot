import { createContext } from "react";
import { useAgent } from "@/hooks/useAgent";
type AgentContextType = ReturnType<typeof useAgent>;

export const AgentContext = createContext<AgentContextType>(
  {} as AgentContextType
);
