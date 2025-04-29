import { useState, useCallback } from "react";
import { SimulationData } from "@/db/types";
import { simulationService } from "@/services/simulationService";

export function useSimulations() {
  const [simulations, setSimulations] = useState<SimulationData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSimulations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await simulationService.getAll();
      setSimulations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const createSimulation = useCallback(
    async (simulation: Partial<SimulationData>) => {
      setLoading(true);
      setError(null);
      try {
        const newSimulation = await simulationService.create(simulation);
        setSimulations((prev) => [...prev, newSimulation]);
        return newSimulation;
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateSimulation = useCallback(
    async (id: string, simulation: Partial<SimulationData>) => {
      setLoading(true);
      setError(null);
      try {
        const updatedSimulation = await simulationService.update(
          id,
          simulation
        );
        setSimulations((prev) =>
          prev.map((s) => (s.id === id ? updatedSimulation : s))
        );
        return updatedSimulation;
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteSimulation = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await simulationService.delete(id);
      setSimulations((prev) => prev.filter((s) => s.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getSimulation = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await simulationService.getById(id);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchSimulations = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await simulationService.search(query);
      setSimulations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const getSimulationsByCategory = useCallback(async (category: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await simulationService.getByCategory(category);
      setSimulations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const getSimulationsByDifficulty = useCallback(async (difficulty: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await simulationService.getByDifficulty(difficulty);
      setSimulations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    simulations,
    loading,
    error,
    fetchSimulations,
    createSimulation,
    updateSimulation,
    deleteSimulation,
    getSimulation,
    searchSimulations,
    getSimulationsByCategory,
    getSimulationsByDifficulty,
  };
}
