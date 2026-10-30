import { useState } from "react";
import { analysisApi } from "../services/analysis.api";

export function useAnalysisJob() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const runAnalysis = async (repository: string) => {
    setLoading(true);
    try {
      const res = await analysisApi.runRepoAnalysis(repository);
      setData(res);
      return res;
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, runAnalysis };
}
