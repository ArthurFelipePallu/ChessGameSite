import api from "../../api/axios";
import type { GameStateDto, PossibleMovesDto } from "../../api/chessApi";
import type { AxiosError } from "axios";

export interface ErrorResponseDto {
  message: string;
  errorCode?: string;
  statusCode: number;
}

export type ApiResult<T> = 
  | { success: true; data: T }
  | { success: false; error: ErrorResponseDto };

/**
 * Starts a new chess game match
 * @returns GameStateDto on success, ErrorResponseDto on failure
 */
export async function StartGame(): Promise<ApiResult<GameStateDto>> {
  try {
    const response = await api.get<GameStateDto>('/chessgame/start-game');
    return { success: true, data: response.data };
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponseDto>;
    if (axiosError.response?.data) {
      return { 
        success: false, 
        error: axiosError.response.data 
      };
    }
    return {
      success: false,
      error: {
        message: axiosError.message || 'An unexpected error occurred',
        errorCode: 'NetworkError',
        statusCode: axiosError.response?.status || 500
      }
    };
  }
}

/**
 * Gets the default chess board state
 * @returns GameStateDto on success, ErrorResponseDto on failure
 */
export async function getDefaultState(): Promise<ApiResult<GameStateDto>> {
  try {
    const response = await api.get<GameStateDto>('/chessgame/default-state');
    return { success: true, data: response.data };
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponseDto>;
    if (axiosError.response?.data) {
      return { 
        success: false, 
        error: axiosError.response.data 
      };
    }
    return {
      success: false,
      error: {
        message: axiosError.message || 'An unexpected error occurred',
        errorCode: 'NetworkError',
        statusCode: axiosError.response?.status || 500
      }
    };
  }
}

/**
 * Gets a random chess board state
 * @returns GameStateDto on success, ErrorResponseDto on failure
 */
export async function getRandomState(): Promise<ApiResult<GameStateDto>> {
  try {
    const response = await api.get<GameStateDto>('/chessgame/random-state');
    return { success: true, data: response.data };
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponseDto>;
    if (axiosError.response?.data) {
      return { 
        success: false, 
        error: axiosError.response.data 
      };
    }
    return {
      success: false,
      error: {
        message: axiosError.message || 'An unexpected error occurred',
        errorCode: 'NetworkError',
        statusCode: axiosError.response?.status || 500
      }
    };
  }
}


/**
 * Gets the possible moves of the piece on a square given its row and column
 * @returns PossibleMovesDto on success, ErrorResponseDto on failure
 */
export async function getPossibleMovesAtPosition(row:number,col:number): Promise<ApiResult<PossibleMovesDto>> {
  try {
    const chessNotationPosition = toChessNotation(row,col);
    const response = await api.get<PossibleMovesDto>(`/chessgame/possible-move/${chessNotationPosition}`);
    return { success: true, data: response.data };
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponseDto>;
    if (axiosError.response?.data) {
      return { 
        success: false, 
        error: axiosError.response.data 
      };
    }
    return {
      success: false,
      error: {
        message: axiosError.message || 'An unexpected error occurred',
        errorCode: 'NetworkError',
        statusCode: axiosError.response?.status || 500
      }
    };
  }
}
function toChessNotation(row:number, column:number) {
  if (row < 0 || row > 7 || column < 0 || column > 7) {
    throw new Error("Row and column must be between 0 and 7");
  }

  const file = String.fromCharCode("a".charCodeAt(0) + column);
  const rank = 8 - row;

  return `${file}${rank}`;
}