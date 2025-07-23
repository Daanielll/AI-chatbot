import React, { ReactNode } from "react";
import { useAgent } from "@/hooks/useAgent";
import { AgentContext } from "@/contexts/AgentContext";

export const AgentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const Agent = useAgent();
  const contextValue = Agent;
  return (
    <AgentContext.Provider value={contextValue}>
      {children}
    </AgentContext.Provider>
  );
};
