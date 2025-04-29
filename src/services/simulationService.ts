import axios from "axios";
import { SimulationData } from "@/db/types";

const API_URL = "/api/simulations";

export const simulationService = {
  // Get all simulations
  getAll: async (): Promise<SimulationData[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // Get a single simulation by ID
  getById: async (id: string): Promise<SimulationData> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  // Create a new simulation
  create: async (
    simulation: Partial<SimulationData>
  ): Promise<SimulationData> => {
    const response = await axios.post(API_URL, simulation);
    return response.data;
  },

  // Update a simulation
  update: async (
    id: string,
    simulation: Partial<SimulationData>
  ): Promise<SimulationData> => {
    const response = await axios.put(API_URL, { id, ...simulation });
    return response.data;
  },

  // Delete a simulation
  delete: async (id: string): Promise<boolean> => {
    const response = await axios.delete(API_URL, { data: { id } });
    return response.data.success;
  },

  // Search simulations
  search: async (query: string): Promise<SimulationData[]> => {
    const response = await axios.get(`${API_URL}/search?q=${query}`);
    return response.data;
  },

  // Get simulations by category
  getByCategory: async (category: string): Promise<SimulationData[]> => {
    const response = await axios.get(`${API_URL}/category/${category}`);
    return response.data;
  },

  // Get simulations by difficulty
  getByDifficulty: async (difficulty: string): Promise<SimulationData[]> => {
    const response = await axios.get(`${API_URL}/difficulty/${difficulty}`);
    return response.data;
  },
};
