import api from "../../api/axios";
import type { GameStateDTO } from "../../models/Chess/GameStateDTO";


export async function getDefaultState(): Promise<GameStateDTO> {
  const response = await api.get<GameStateDTO>('/chess/default-state');
  return response.data; // ✅ string wrapped as Promise automatically
}

export async function getRandomState(): Promise<GameStateDTO> {
  const response = await api.get<GameStateDTO>('/chess/random-state');
  return response.data; // ✅ string wrapped as Promise automatically
}