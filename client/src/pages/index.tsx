import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(createPageUrl("Analytics"), { replace: true });
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-full bg-gray-50">
      <div className="text-center">
        <p className="text-lg font-medium text-gray-700">
          Loading your dashboard...
        </p>
        <p className="text-sm text-gray-500">Please wait a moment.</p>
      </div>
    </div>
  );
}
