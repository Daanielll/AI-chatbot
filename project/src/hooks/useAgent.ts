import { createAgent, getAgents } from "@/api/agent";
import { AgentType } from "@/types/agent";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";

export const useAgent = () => {
  const localAgentId =
    typeof window !== "undefined" ? localStorage.getItem("agentId") : null;
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(
    localAgentId
  );

  const agentsQuery = useQuery({
    queryKey: ["agent"],
    queryFn: getAgents,
  });

  const createAgentMutation = useMutation({
    mutationFn: createAgent,
    onSuccess: () => agentsQuery.refetch(),
  });

  const selectAgent = (id: string) => {
    localStorage.setItem("agentId", id);
    setSelectedAgentId(id);
  };

  // Find the selected agent from the query result
  const selectedAgent: AgentType | null = useMemo(() => {
    if (!selectedAgentId || !agentsQuery.data?.data) return null;
    return (
      agentsQuery.data.data.find(
        (agent: AgentType) => agent.id === selectedAgentId
      ) || null
    );
  }, [selectedAgentId, agentsQuery.data]);

  return {
    agent: selectedAgent,
    allAgents: agentsQuery.data?.data || [],
    agentLoading: agentsQuery.isLoading,
    createAgent: createAgentMutation.mutateAsync,
    selectAgent,
  };
};
