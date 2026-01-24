import api from "../../api/axios";
import type { GameStateDto } from "../../api/chessApi";


export async function getDefaultState(): Promise<GameStateDto> {
  const response = await api.get<GameStateDto>('/chessgame/default-state');
  return response.data; // ✅ string wrapped as Promise automatically
}

export async function getRandomState(): Promise<GameStateDto> {
  const response = await api.get<GameStateDto>('/chessgame/random-state');
  return response.data; // ✅ string wrapped as Promise automatically
}