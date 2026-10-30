import { useState } from "react";
import type { SearchResultItem } from "@devpilot/shared";
import { searchApi } from "../services/search.api";

export function useCodeSearch() {
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState("0.14s");

  const search = async (query: string, options?: { regex?: boolean; matchCase?: boolean }) => {
    setLoading(true);
    try {
      const res = (await searchApi.executeSearch(query, options)) as any;
      setResults(res.results || []);
      setDuration(res.duration || "0.14s");
      return res;
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, duration, search };
}
